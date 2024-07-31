const TableDataAccount = async () => {
  const trTableDataAcc = document.getElementById('productManager');
  trTableDataAcc.innerHTML = '';
  try {
    const response = await axios.get(`/api-product/get-all-product`);
    response.data.data.forEach(ProductManager => {
      const categoryName = ProductManager.categoryde.name;
      let listAccount = `  
                <tr class="text-center">  
                    <td class="align-middle">${ProductManager.id}</td>                
                    <td class="align-middle w-25">${ProductManager.name}</td>  
                    <td class="align-middle"><img class="rounded" src="/IMG/${ProductManager.image}" height="90" width="150"></td>  
                    <td class="align-middle">${ProductManager.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}</td>  
                    <td class="align-middle">${new Date(ProductManager.createDate).toLocaleDateString('vi-VN')}</td>  
                    <td class="align-middle">${categoryName}</td>  
                    <td class="align-middle d-flex justify-content-center" style="margin-top: 57px">  
                        <button class="btn btn-info click-edit" data-id="${ProductManager.id}"><i class="bi bi-pencil-square"></i></button>  
                        <button class="btn btn-danger ms-1"><i class="bi bi-x-lg"></i></button>  
                    </td>  
                </tr>  
            `;
      trTableDataAcc.insertAdjacentHTML('beforeend', listAccount);
    });
    // Event listener for edit buttons
    document.querySelectorAll('.click-edit').forEach(button => {
      button.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        // Switch to the second tab
        const tabTrigger = new bootstrap.Tab(
            document.getElementById('ex1-tab-2'));
        tabTrigger.show();
        // Fetch and fill product data
        editProduct(id);
      });
    });
  } catch (error) {
    console.error(error);
  }
};
document.addEventListener('DOMContentLoaded', TableDataAccount);

const editProduct = async (productId) => {
  const container = document.getElementById('editProductForm'); // Ensure you're filling the correct tab
  container.innerHTML = ''; // Clear previous content
  try {
    const response = await axios.get(
        `/api-product/edit-product?id=${productId}`);
    const product = response.data.data;

    // Format the create date properly if needed
    const createDate = new Date(product.createDate);
    const formattedCreateDate = createDate.toISOString().split('T')[0];
    const categoryName = product.categoryde.name;
    const html = `  
        <div class="d-flex position-absolute" style="margin-left: 1100px;margin-top: -39px">
          <span>ID:${product.id}</span>
        </div>
        <form id="editProductDetails">  
            <div class="row">  
                <div class="col-6">  
                    <div class="form-outline mb-4 ms-3">  
                        <label class="form-label ms-2" for="fileInput">Hình ảnh</label>  
                        <input class="form-control" id="fileInput" type="file"/>  
                    </div>  
                    <div class="form-outline text-center bg-light rounded ms-3" style="max-width: 600px; height: 405px;">  
                        <img class="rounded" id="imagePreview" src="/IMG/${product.image}" width="550" height="405"/>  
                    </div>  
                </div>  
                <div class="col-6">  
                    <div class="form-outline mb-2">  
                        <label class="form-label ms-2" for="name">Tên khóa học</label>  
                        <input type="text" id="name" class="form-control" value="${product.name}"/>  
                    </div>  
                    <div class="form-outline mb-2">  
                        <label class="form-label ms-2" for="cate">Loại</label>  
                        <input type="text" id="cate" class="form-control" value="${categoryName}"/>  
                    </div>
                    <div class="form-outline mb-2">  
                        <label class="form-label ms-2" for="price">Giá</label>  
                        <input type="text" id="price" class="form-control" value="${product.price.toLocaleString(
        'vi-VN', {style: 'currency', currency: 'VND'})}"/>  
                    </div> 
                     <div class="d-flex">
                       <div class="form-outline mb-2 w-50">  
                          <label class="form-label ms-2" for="createDate">Ngày tạo</label>  
                          <input type="date" id="createDate" class="form-control" value="${formattedCreateDate}"/>  
                      </div>  
                      <div class="form-outline mb-2 w-50 ms-4">
                        <label class="form-label ms-2" for="qtyInput">Số lượng</label>
                        <input type="text" id="qtyInput" class="form-control" value="${product.qty}"/>
                      </div>
                    </div>
                    <div class="form-outline mb-2">
                      <label class="form-label ms-2" for="descriptionInput">Mô tả</label>
                      <textarea class="form-control" id="descriptionInput" rows="4">${product.mota}</textarea>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="saveChanges('${productId}')">Lưu thay đổi</button>  
                    <button type="button" class="btn btn-danger" onclick="" style="background-color: #f8285a">Xóa</button>  
                    <button type="button" class="btn btn-secondary text-dark" onclick="resetForm()" style="background-color: #e9f3ff;border-color: #e9f3ff">Làm mới</button>                </div>  
            </div>  
        </form>  
        `;
    container.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    console.error(error);
  }
};

// RESET PRODUCT
function resetForm() {
  document.getElementById('name').value = ''; // Matching ID for Tên khóa học
  document.getElementById('cate').value = ''; // Matching ID for Loại
  document.getElementById('price').value = ''; // Matching ID for Giá
  document.getElementById('createDate').value = ''; // Matching ID for Ngày tạo
  document.getElementById('qtyInput').value = ''; // Matching ID for Số lượng
  document.getElementById('descriptionInput').value = ''; // Matching ID for Mô tả
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = '';
  imagePreview.style.display = 'none';
}

// ADD PRODUCT
document.getElementById('addProductBtn').addEventListener('click', async function() {
  // Lấy thông tin sản phẩm từ các trường nhập liệu
  const name = document.getElementById('name').value;
  const priceString = document.getElementById('price').value;
  const price = parseFloat(priceString); // Chuyển đổi giá thành số
  const createDate = document.getElementById('createDate').value;
  const qty = parseInt(document.getElementById('qtyInput').value);
  const mota = document.getElementById('descriptionInput').value;

  // Lấy thông tin danh mục
  const categoryId = document.getElementById('categoryId').value;
  const categoryName = document.getElementById('categoryName').value;
  const parentCategoryId = document.getElementById('parentCategoryId').value;
  const parentCategoryName = document.getElementById('parentCategoryName').value;

  // Đối tượng CategoryDetail
  const categoryDetail = {
    id: categoryId,
    name: categoryName,
    category: {
      id: parentCategoryId,  // Lấy ID của danh mục cha
      name: parentCategoryName // Lấy tên của danh mục cha
    }
  };

  // Tạo đối tượng sản phẩm
  const product = {
    name: name,
    image: document.getElementById('fileInput').files.length > 0 ? document.getElementById('fileInput').files[0].name : null,
    price: price,
    createDate: createDate,
    available: true, // Giả sử mặc định là có sẵn
    categoryde: categoryDetail, // Sử dụng đối tượng categoryDetail đã tạo ở trên
    qty: qty,
    mota: mota
  };

  // Gửi yêu cầu đến API
  try {
    const response = await fetch('http://localhost:8080/api-product/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      const result = await response.json();
      alert('Sản phẩm đã được thêm thành công: ' + result.name);
    } else {
      const error = await response.json();
      alert('Có lỗi xảy ra: ' + error.message);
    }
  } catch (error) {
    alert('Có lỗi xảy ra khi kết nối với máy chủ: ' + error.message);
  }
});

//Hiện image tu type input file lên form
// Hàm để khởi tạo hình ảnh mặc định khi tải trang
function setDefaultImage() {
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = '/IMG/default-image.webp'; // Thay thế với đường dẫn đến hình ảnh mặc định của bạn
}

// Hàm để xử lý sự kiện thay đổi tệp
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0]; // Lấy tệp được chọn
  const imagePreview = document.getElementById('imagePreview');

  if (file) {
    // Tạo một URL từ tệp đã chọn
    const reader = new FileReader();
    reader.onload = function(e) {
      imagePreview.src = e.target.result; // Cập nhật src của <img> với dữ liệu hình ảnh
    };
    reader.readAsDataURL(file); // Đọc tệp dưới dạng dữ liệu URL
  } else {
    setDefaultImage(); // Nếu không có tệp nào được chọn, đặt lại hình ảnh mặc định
  }
});

// Khởi tạo hình ảnh mặc định khi trang được tải
window.onload = setDefaultImage;
