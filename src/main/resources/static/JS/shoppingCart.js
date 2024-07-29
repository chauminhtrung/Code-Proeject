let cart = []
let storage = localStorage.getItem('cart')
if (storage){
    cart = JSON.parse(storage)
}


const addCart = async (id) => {


    const response = await axios.get(`/api-product/detail-product?id=${id}`);
    const prolist = response.data.data;
    let item = cart.find( c => c.prolist.id === id);
    if(item){

        alert("Khóa học này đã có trên giỏ hàng")
    }else{
        try{
            cart.push({prolist,qty:1})
        }catch (error) {
            console.error(error);
            container.innerHTML = '<p>Có lỗi xảy ra khi gọi API.</p>';
        }

    }

    localStorage.setItem('cart',JSON.stringify(cart))
    viewCart(cart);
}



const viewCart = (shoppingCart) =>{

    let cartBody = document.getElementById('cartbody')
    cartBody.innerHTML = '';

    shoppingCart.map(item =>{
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
        .reduce((total,qty) => total+=qty,0);
    const formatPrice = SumPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const sum =  formatPrice +" đ";
    document.getElementById('cart-sumPrice').textContent = sum;

}

const removeItem = id =>{
    let storage = localStorage.getItem('cart')
    if (storage){
        cart = JSON.parse(storage)
    }
    cart = cart.filter(item => item.prolist.id !== id)
    localStorage.setItem('cart',JSON.stringify(cart))
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
function checkout(){
    let account = document.getElementById('username').value;
    let address = document.getElementById('address').value;
    let creationDate = document.getElementById('datenow').value;

    let createOrder = {
        address: address,
        createDate: creationDate,
        account: {username: account},
        orderDetail:{
            product: {id:cart.map(item => item.prolist.id)},
            price: cart.map(item => item.prolist.price),
            quantity: cart.map(item => item.qty)
        }

    };

    console.table(createOrder);
    axios.post('/rest-orders/createOrder', createOrder)
        .then(resp=>{
            if (resp.data.success){
                alert("dat thanh cong2");
            }
            alert("dat thanh cong");
            // cart.clear();
            // location.href = "/order/detail/" + resp.data.id;
    }).catch(err =>{
        console.log(err);
    })
}

// const checkout = async () =>{
//
//     const data ={
//         address : document.getElementById('address').value,
//         creationDate : document.getElementById('datenow').value,
//         account :{username: document.getElementById('username').value},
//     }
//     axios.post('/rest-orders',data);
//     console.table(data);
//     console.log(data);
// }