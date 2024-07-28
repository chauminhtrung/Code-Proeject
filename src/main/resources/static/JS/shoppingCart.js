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

//Hàm đếm sl//
const Cartcount = cart.length;
// document.getElementById('cart-count').textContent = Cartcount;

const SumPrice = cart.map(item => item.qty * item.prolist.price)
    .reduce((total,qty) => total+=qty,0);
const formatPrice = SumPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const sum = "SUM: "+ formatPrice +" đ";
document.getElementById('cart-sumPrice').textContent = sum;

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
              
                <td><button class="btn btn-danger" onclick="removeItem(${item.prolist.id})">Del</button></td>
            </tr>
            </tbody>`
                /*<td>
                <button class="btn-qty" onclick="decreaseQuantity(this)">-</button>
                <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.prolist.id}">
                <button class="btn-qty" onclick="increaseQuantity(this)">+</button>
                </td>*/
    })


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

// function decreaseQuantity(button) {
//     const inputField = button.nextElementSibling;
//     let qty = parseInt(inputField.value);
//     if (qty > 1) {
//         inputField.value = qty - 1;
//         const id = inputField.dataset.id;
//         updateCartItem(id, qty - 1);
//     }
// }
//
// function increaseQuantity(button) {
//     const inputField = button.previousElementSibling;
//     let qty = parseInt(inputField.value);
//     inputField.value = qty + 1;
//     const id = inputField.dataset.id;
//     updateCartItem(id, qty + 1);
// }
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