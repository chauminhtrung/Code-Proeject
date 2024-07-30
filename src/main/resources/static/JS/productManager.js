const TableDataAccount = async () => {
  const trTableDataAcc = document.getElementById('productManager');
  trTableDataAcc.innerHTML = '';

  try {
    const response = await axios.get(`/manager/get-all-product`);
    response.data.data.forEach(ProductManager => {
      // Lấy thông tin từ categoryde
      const categoryId = ProductManager.categoryde.id; // Lấy ID của categoryde
      const categoryName = ProductManager.categoryde.name; // Lấy name của categoryde

      let listAccount = `  
            <tr class="text-center">  
                <td class="align-middle">${ProductManager.id}</td>                
                <td class="align-middle w-25">${ProductManager.name}</td>  
                <td class="align-middle"><img class="rounded" src="/IMG/${ProductManager.image}" height="80" width="150"></td>  
                <td class="align-middle">${ProductManager.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>  
                <td class="align-middle">${new Date(ProductManager.createDate).toLocaleDateString('vi-VN')}</td>  
                <td class="align-middle">${categoryName}</td>  
                <td class="align-middle d-flex justify-content-center" style="margin-top: 45px">  
                    <a href="/manager/EditProducts" class="btn btn-info"><i class="bi bi-pencil-square"></i></a>  
                    <button class="btn btn-danger ms-1"><i class="bi bi-x-lg"></i></button>  
                </td>  
            </tr>  
        `;
      trTableDataAcc.insertAdjacentHTML('beforeend', listAccount);
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', TableDataAccount);