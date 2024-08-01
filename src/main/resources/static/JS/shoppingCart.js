let cart = []
let storage = localStorage.getItem('cart')
if (storage) {
    cart = JSON.parse(storage)
}


const addCart = async (id) => {

    const response = await axios.get(`/api-product/detail-product?id=${id}`);
    const prolist = response.data.data;
    let item = cart.find(c => c.prolist.id === id);
    if (item) {

        Swal.fire({
            icon: 'error',
            title: 'More failed courses',
            text: 'This course is already in your cart.',
        });
    } else {
        try {
            cart.push({prolist, qty: 1})
            Swal.fire({
                icon: 'success',
                title: 'Added course successfully',
                text: 'This course has been added successfully.',
                timer: 1500
            })
        } catch (error) {
            console.error(error);
            container.innerHTML = '<p>Có lỗi xảy ra khi gọi API.</p>';
        }

    }

    localStorage.setItem('cart', JSON.stringify(cart))
    viewCart(cart);
}


const viewCart = (shoppingCart) => {

    let cartBody = document.getElementById('cartbody')
    cartBody.innerHTML = '';

    shoppingCart.map(item => {
        cartBody.innerHTML += `
            <tbody>
            <tr>
                <th scope="row"><img src="../IMG/${item.prolist.image}" width="50px"></th>
                <td>${item.prolist.name}</td>
                <td>${item.prolist.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
              
                <td>
                    <a class="text-danger" href=""><i class="bi bi-trash3" onclick="removeItem(${item.prolist.id})"></i></a>
                </td>
            </tr>
            </tbody>`
        /*<td>
        <button class="btn-qty" onclick="decreaseQuantity(this)">-</button>
        <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.prolist.id}">
        <button class="btn-qty" onclick="increaseQuantity(this)">+</button>
        </td>*/
    })
//Hàm đếm sl//

// document.getElementById('cart-count').textContent = Cartcount;

    const SumPrice = cart.map(item => item.qty * item.prolist.price)
        .reduce((total, qty) => total += qty, 0);
    const formatPrice = SumPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const sum = formatPrice + " đ";
    document.getElementById('cart-sumPrice').textContent = sum;

}

const removeItem = id => {
    let storage = localStorage.getItem('cart')
    if (storage) {
        cart = JSON.parse(storage)
    }
    cart = cart.filter(item => item.prolist.id !== id)
    localStorage.setItem('cart', JSON.stringify(cart))
    viewCart(cart)
}

/* Hàm này để đây đừng xóa nhé tôi ơi */

//giảm qty
// function decreaseQuantity(button) {
//     const inputField = button.nextElementSibling;
//     let qty = parseInt(inputField.value);
//     if (qty > 1) {
//         inputField.value = qty - 1;
//         const id = inputField.dataset.id;
//         updateCartItem(id, qty - 1);
//     }
// }

// tăng qty
// function increaseQuantity(button) {
//     const inputField = button.previousElementSibling;
//     let qty = parseInt(inputField.value);
//     inputField.value = qty + 1;
//     const id = inputField.dataset.id;
//     updateCartItem(id, qty + 1);
// }

// lưu qty updated vào localstorage
// function updateCartItem(id, qty) {
//     let storage = localStorage.getItem('cart');
//
//     if (storage) {
//         cart = JSON.parse(storage);
//         let item = cart.find(c => c.prolist.id == id);
//         if (item) {
//             item.qty = qty;
//             localStorage.setItem('cart', JSON.stringify(cart));
//             viewCart(cart);
//         }
//     }
// }

viewCart(cart);

function checkout() {
    let account = document.getElementById('username').value;
    let address = document.getElementById('address').value;


    let createOrder = {
        address: address,
        createDate: new Date(),
        account: {username: account},
        get orderDetails() {
            return cart.map(item => {
                return {
                    product: {id: item.prolist.id,
                                image: item.prolist.image,
                    name:item.prolist.name},
                    price: item.prolist.price,
                    quantity: item.qty
                }
            });
        },
    };

    console.table(createOrder);
    var Order = {...createOrder}
    axios.post('/rest-orders/createOrder', Order)
        .then(resp => {
            if (resp.data.success) {
                localStorage.clear();
                Swal.fire({
                    title: "Pay Succsess!",
                    text: "You won't be able to revert this!",
                    icon: "success",
                    showCancelButton: true,
                    confirmButtonColor: "#437eb6",
                    cancelButtonColor: "#479867",
                    confirmButtonText: "View Order",
                    cancelButtonText: "Home"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //Goi Modal OrderDetail
                        Swal.fire({
                            title: "Newly Created Order!",
                            width: '1000px',
                            html: `
        
        <div>
          <p>Total Amount: <b class="text-danger">$${createOrder.orderDetails.reduce((total, item) => total + item.price * item.quantity, 0)
                                .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</b></p>
          <p>Email Address: <i class="text-dark-warning">${createOrder.address}</i></p>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">Id Product</th>
      <th scope="col">Image</th>
      <th scope="col">Name</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
  ${createOrder.orderDetails.map(item=>`
         <tr>
      <th scope="row">${item.product.id}</th>
      <td><img src="/IMG/${item.product.image}" width="30px" alt=""></td>
      <td>${item.product.name}</td>
      <td>${item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
    </tr>
  `).join('')}
  </tbody>
</table>
        </div>

      `,
                            showCancelButton: true,
                            confirmButtonColor: "#437eb6",
                            cancelButtonColor: "#479867",
                            confirmButtonText: "View all Order",
                            cancelButtonText: "Home"
                        }).then((res) => {
                            if (res.isConfirmed) {
                                window.location.href = "/order/list";
                            } else {
                                //quay ve home
                                window.location.href = "/home";
                            }

                        })
                    } else {
                        //quay ve home
                        window.location.href = "/home";
                    }
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            }

            // cart.clear();
            // location.href = "/order/detail/" + resp.data.id;
        }).catch(err => {
        console.log(err);
    })
}
