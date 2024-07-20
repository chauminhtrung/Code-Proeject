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
        item.qty +=1;
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
                <td>${item.prolist.price}</td>
                <td>
                <button class="btn-qty" onclick="decreaseQuantity(this)">-</button>
                <input type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.prolist.id}">
                <button class="btn-qty" onclick="increaseQuantity(this)">+</button></td>
                <td><button class="btn btn-danger" onclick="removeItem(${item.prolist.id})">Del</button></td>
            </tr>
            </tbody>`
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


function decreaseQuantity(button) {
    const inputField = button.nextElementSibling;
    let qty = parseInt(inputField.value);
    if (qty > 1) {
        inputField.value = qty - 1;
        const id = inputField.dataset.id;
        updateCartItem(id, qty - 1);
    }
}

function increaseQuantity(button) {
    const inputField = button.previousElementSibling;
    let qty = parseInt(inputField.value);
    inputField.value = qty + 1;
    const id = inputField.dataset.id;
    updateCartItem(id, qty + 1);
}
function updateCartItem(id, qty) {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
        let item = cart.find(c => c.prolist.id === id);
        if (item) {
            item.qty = qty;
            localStorage.setItem('cart', JSON.stringify(cart));
            viewCart(cart);
        }

    alert(cart)
    }
}

viewCart(cart);