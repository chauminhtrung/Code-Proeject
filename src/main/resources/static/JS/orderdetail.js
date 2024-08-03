const viewOrderLinks = document.querySelectorAll('.view-order');

viewOrderLinks.forEach(link => {
    link.addEventListener('click', async (event) => {
        event.preventDefault();
        const orderId = event.target.closest('.view-order').getAttribute('data-id');
        console.log(orderId)
        try {
            const response = await axios.get(`/rest-orders/getCourseByid/${orderId}`);
            const order = response.data.data.order;
            const orderDetails = response.data.data.orderDetails;
            console.log(orderDetails)
            // Hiển thị alert với ID và thông tin chi tiết của order
            Swal.fire({
                title: "Order Id: " + order.id,
                width: '1000px',
                html: `
        
        <div>
        <p>Total Amount: <b class="text-danger">$${orderDetails.reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</b></p>
          <p>Create Date: <i class="text-dark-warning">${order.createDate}</i></p>
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
                  ${orderDetails.map(item => `
                         <tr>
                      <th scope="row">${item.product.id}</th>
                      <td><img src="/IMG/${item.product.image}" width="50px" alt=""></td>
                      <td>${item.product.name}</td>
                      <td>${item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                    </tr>
                  `).join('')}
             </tbody>
            </table>
        </div>

      `,

                confirmButtonColor: "#437eb6",
                confirmButtonText: "Cancel",

            })
        } catch (error) {
            console.error('Lỗi khi lấy thông tin order:', error);
        }
    });
});