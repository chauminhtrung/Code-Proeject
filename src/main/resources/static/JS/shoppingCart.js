let cart = []
let storage = localStorage.getItem('cart')
if (storage){
    cart = JSON.parse(storage)
}
const addCart = async (id) => {
    alert(id)

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

        localStorage.setItem('cart',JSON.stringify(cart))
        viewCart(cart);
    }

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
                <td>${item.qty}</td>
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


viewCart(cart);