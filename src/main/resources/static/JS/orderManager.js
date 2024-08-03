const TableDataAccount = async () => {
    const trTableDataAcc = document.getElementById('orderManager');
    trTableDataAcc.innerHTML = '';
    try {
        const response = await axios.get(`/rest-orders/getAllCourse`);
        // Sắp xếp dữ liệu theo ngày tạo mới nhất đến lâu nhất
        response.data.data.sort((a, b) => {
            const dateA = new Date(a.createDate);
            const dateB = new Date(b.createDate);
            return dateB - dateA; // Sắp xếp giảm dần
        });
        for (const orderManager of response.data.data) {
            console.table(orderManager)
            const createDate = new Date(orderManager.createDate);
            const formattedCreateDate = `${createDate.getDate()}/${createDate.getMonth() + 1}/${createDate.getFullYear()}`;
            const resp = await axios.get(`/rest-orders/getCourseByid/${orderManager.id}`);
            const detailOr = resp.data.data.orderDetails;
            let listAccount = `  
                <tr class="text-center">  
                    <td class="align-middle">${orderManager.id}</td>                
                    <td class="align-middle">${orderManager.account.username}</td>  
                     <td class="align-middle">${orderManager.account.email}</td>  
                     <td class="align-middle">${formattedCreateDate}</td>
                     <td class="align-middle"><b class="text-danger">${detailOr.reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</b></td>
                      <td><a style="cursor: pointer;font-size: 20px;" class="view-orderDetail" onclick="detailOr(${orderManager.id})"><i class="bi bi-eye text-dark-success" ></i></a></td>
                </tr>  
            `;
            trTableDataAcc.insertAdjacentHTML('beforeend', listAccount);
        }


    } catch (error) {
        console.error(error);
    }

};

document.addEventListener('DOMContentLoaded', TableDataAccount);

async function detailOr(id) {
    try {
        const resp = await axios.get(`/rest-orders/getCourseByid/${id}`);
        const orderMan = resp.data.data.order;
        console.table(orderMan);
        console.table(resp.data.data)
        const orderDetailsMan = resp.data.data.orderDetails;
        console.table(orderDetailsMan)
        // Hiển thị alert với ID và thông tin chi tiết của order
        Swal.fire({
            title: "Order Id: " + orderMan.id,
            width: '1000px',
            html: `
        
        <div>
        <p>Total Amount: <b class="text-danger">$${orderDetailsMan.reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</b></p>
          <p>Create Date: <i class="text-dark-warning">${orderMan.createDate}</i></p>
          <p>Email User: <i class="text-dark-warning">${orderMan.address}</i></p>
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
                  ${orderDetailsMan.map(item => `
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
}
