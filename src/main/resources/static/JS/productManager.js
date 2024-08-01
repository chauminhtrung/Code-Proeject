/* jshint esversion: 8 */
// Hàm để gọi API lấy danh sách danh mục
const fetchcategory = async () => {
  try {
    const response = await axios.get('/api-category/get-all-category');
    return response.data.data; // Trả về danh sách danh mục
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
const fetchcategoryde = async () => {
  try {
    const response = await axios.get('/api-category/get-all-categoryde');
    return response.data.data; // Trả về danh sách danh mục
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

//======================================Load DATA TABLE
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
                    <td class="align-middle ">${ProductManager.name}</td>  
                    <td class="align-middle"><img class="rounded" src="/IMG/${ProductManager.image}" height="90" width="150"></td>  
                    <td class="align-middle">${ProductManager.price.toLocaleString(
          'vi-VN', {style: 'currency', currency: 'VND'})}</td>  
                    <td class="align-middle">${new Date(
          ProductManager.createDate).toLocaleDateString('vi-VN')}</td> 
                    <td class="align-middle">${ProductManager.available}</td>                
                    <td class="align-middle">${ProductManager.categoryde.id}</td>
                    <td class="align-middle">${ProductManager.categoryde.name}</td>
                    <td class="align-middle">${ProductManager.categoryde.category.id}</td>
                    <td class="align-middle">${ProductManager.categoryde.category.name}</td>
                    <td class="align-middle">  
                        <button class="btn btn-info click-edit" data-id="${ProductManager.id}"><i class="bi bi-pencil-square"></i></button>  
                        <button class="btn btn-danger mt-2 click-delete" data-id="${ProductManager.id}"><i class="bi bi-x-lg"></i></button>
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

    // Event listener for delete buttons
    document.querySelectorAll('.click-delete').forEach(button => {
      button.addEventListener('click', async function () {
        const id = this.getAttribute('data-id');
        const confirmDelete = confirm(
            "Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmDelete) {
          try {
            const response = await axios.delete(`/api-product/delete/${id}`);
            alert(response.data.message); // Hiển thị thông điệp thành công
            TableDataAccount(); // Tải lại bảng sản phẩm
          } catch (error) {
            console.error(error);
            alert("Đã xảy ra lỗi khi xóa sản phẩm.");
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', TableDataAccount);

// EDIT PRODUCT
const editProduct = async (productId) => {
  const container = document.getElementById('editProductForm');
  container.innerHTML = '';
  try {
    const response = await axios.get(
        `/api-product/edit-product?id=${productId}`);
    const product = response.data.data;

    // Format the create date properly if needed
    const createDate = new Date(product.createDate);
    const formattedCreateDate = createDate.toISOString().split('T')[0];

    // Gọi hàm fetchCategories để lấy danh mục
    const category = await fetchcategory();
    const categoryde = await fetchcategoryde();

    const currentCategorydeId = product.categoryde.id;
    const currentCategorydeName = product.categoryde.name;
    const currentCategoryId = product.categoryde.category.id;
    const currentCategoryName = product.categoryde.category.name;

    //=================================SELECT CATEGORY
    const categoryId = category.map(category => {
      if (category.id !== currentCategoryId) {
        return `<option value="${category.id}">${category.id}</option>`;
      }
      return ''; // Loại bỏ option hiện tại
    }).join('');

    const categoryName = category.map(category => {
      if (category.name !== currentCategoryName) {
        return `<option value="${category.name}">${category.name}</option>`;
      }
      return ''; // Loại bỏ option hiện tại
    }).join('');

    //=================================SELECT CATEGORYDE
    const categorydeId = categoryde.map(categoryde => {
      if (categoryde.id !== currentCategorydeId) {
        return `<option value="${categoryde.id}">${categoryde.id}</option>`;
      }
      return ''; // Loại bỏ option hiện tại
    }).join('');
    const categorydeName = categoryde.map(categoryde => {
      if (categoryde.name !== currentCategorydeName) {
        return `<option value="${categoryde.name}">${categoryde.name}</option>`;
      }
      return ''; // Loại bỏ option hiện tại
    }).join('');

    const html = `  
      <div class="d-flex position-absolute" style="margin-left: 1100px;margin-top: -39px">  
        <span>ID: ${product.id}</span>  
      </div>  
      <form id="editProductDetails">  
        <div class="row">  
          <div class="col-6">  
             <div class="form-outline mb-4 ms-3">  
               <label class="form-label ms-2" for="fileInput">Hình ảnh</label>  
                <input class="form-control border" id="fileInput" type="file"/>
            </div>   
            <div class="form-outline text-center bg-light rounded ms-3" style="max-width: 600px; height: 405px;">  
              <img class="rounded" id="imagePreview" src="/IMG/${product.image}" width="550" height="405"/>  
            </div>  
          </div>  
          <div class="col-6">  
            <div class="form-outline mb-2" data-mdb-input-init>  
              <label class="form-label ms-2" for="name">Tên khóa học</label>  
              <input type="text" id="name" class="form-control border" value="${product.name}"/>  
            </div>  
            <div class="form-outline mb-2" data-mdb-input-init>  
              <label class="form-label ms-2" for="price">Giá khóa học</label>  
              <input type="number" id="price" class="form-control border" value="${product.price}"/>  
            </div>  
            
            <div class="d-flex">  
              <div class="form-outline mb-2 w-50">  
                <label class="form-label ms-2" for="CategorydeId">ID Danh Mục</label>  
                <select class="form-select border" aria-label="Default select example" id="CategorydeId">  
                  <option value="${currentCategorydeId}" disabled selected>${currentCategorydeId}</option>  
                  ${categorydeId}  
                </select>  
              </div>  
              <div class="form-outline mb-2 w-50 ms-4">  
                <label class="form-label ms-2" for="CategorydeName">Tên Danh Mục</label>  
                <select class="form-select border" aria-label="Default select example" id="CategorydeName">  
                  <option value="${currentCategorydeName}" disabled selected>${currentCategorydeName}</option>  
                  ${categorydeName}  
                </select>  
              </div>  
            </div> 
            
            <div class="d-flex">  
              <div class="form-outline mb-2 w-50">  
                <label class="form-label ms-2" for="parentCategoryId">ID Danh Mục Cha</label>  
                <select class="form-select border" aria-label="Default select example" id="parentCategoryId">  
                  <option value="${currentCategoryId}" disabled selected>${currentCategoryId}</option>  
                  ${categoryId}  
                </select>  
              </div>  
              <div class="form-outline mb-2 w-50 ms-4">  
                <label class="form-label ms-2" for="parentCategoryName">Tên Danh Mục Cha</label>  
                <select class="form-select border" aria-label="Default select example" id="parentCategoryName">  
                  <option value="${currentCategoryName}" disabled selected>${currentCategoryName}</option>  
                  ${categoryName}  
                </select>  
              </div>  
            </div> 
            <div class="d-flex">
              <div class="form-outline mb-2 w-50">
                <label class="form-label ms-2" for="createDate">Ngày tạo</label>
                <input type="date" id="createDate" class="form-control border" value="${formattedCreateDate}"/>
              </div>
              <div class="form-outline mb-2 w-50 ms-4">
                <label class="form-label ms-2" for="qtyInput">Số lượng</label>
                <input type="number" id="qtyInput" class="form-control border" value="${product.qty}"/>
              </div>
             <div class="ms-2 me-1">  
                <label class="form-label ms-2 w-100" for="available">Available</label>  
                <div class="form-check form-switch mode-switch mt-1 ms-2">  
                  <input class="form-check-input" type="checkbox" id="available" ${product.available ? 'checked' : ''}>  
                </div>  
              </div> 
            </div>
            <div class="form-outline mb-2">  
              <label class="form-label ms-2" for="description">Mô tả</label>  
              <textarea class="form-control border" id="description" rows="3">${product.mota}</textarea>  
            </div> 
            <button type="submit" class="btn btn-success" style="background-color: #3cba54;">Cập nhật</button>  
            <button type="button" class="btn btn-danger ms-2" onclick="deleteProduct(${product.id})" style="background-color: #f8285a">Xóa</button>   
            <button type="button" class="btn btn-secondary text-dark ms-2" onclick="resetForm()" style="background-color: #e9f3ff;border-color: #e9f3ff">Làm mới</button>  
          </div>  
        </div>  
      </form>  
    `;
    container.innerHTML = html;
    // Đoạn mã thêm để cập nhật hình ảnh xem trước
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result; // Cập nhật hình ảnh xem trước với tệp được chọn
        };
        reader.readAsDataURL(file); // Đọc tệp đã chọn dưới dạng URL dữ liệu
      } else {
        // Nếu không có tệp nào được chọn, khôi phục lại hình ảnh mặc định từ cơ sở dữ liệu
        imagePreview.src = `/IMG/${product.image}`;
      }
    });
    // Add event listener for the form submit
    document.getElementById('editProductDetails').addEventListener('submit',
        async (event) => {
          event.preventDefault();
          await updateProduct(productId);
        });
  } catch (error) {
    console.error(error);
  }
};

// UPDATE PRODUCT
const updateProduct = async (productId) => {
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);

// Lấy ID và tên danh mục con (categoryde)
  const categorydeId = document.getElementById('CategorydeId').value; // Đảm bảo ID đúng
  const categorydeName = document.getElementById('CategorydeName').value; // Đảm bảo ID đúng

  // Lấy ID và tên danh mục cha
  const categoryId = document.getElementById('parentCategoryId').value; // Đảm bảo ID đúng
  const categoryName = document.getElementById('parentCategoryName').value; // Đảm bảo ID đúng

  const createDate = document.getElementById('createDate').value;
  const qty = parseInt(document.getElementById('qtyInput').value);
  const description = document.getElementById('description').value;
  const available = document.getElementById('available').checked;
  const image = document.getElementById('fileInput').files[0]
      ? document.getElementById('fileInput').files[0].name : ""; // Thêm logic để lấy giá trị hình ảnh
  // Tạo đối tượng sản phẩm mới
  const updatedProduct = {
    name: name,
    image: image,
    price: price,
    createDate: createDate,
    available: available,
    categoryde: {
      id: categorydeId,
      name: categorydeName,
      category: {
        id: categoryId,
        name: categoryName
      }
    },
    qty: qty,
    mota: description
  };

  try {
    const response = await axios.put(`/api-product/update-product/${productId}`,
        updatedProduct);

    if (response.data.status) {
      alert('Cập nhật sản phẩm thành công!');
      // Có thể thực hiện các bước khác như làm mới dữ liệu hoặc chuyển hướng về trang danh sách sản phẩm
      TableDataAccount();
    } else {
      alert('Cập nhật sản phẩm thất bại: ' + response.data.message);
    }
  } catch (error) {
    if (error.response) {
      alert('Có lỗi xảy ra: ' + error.response.data.message);
    } else {
      alert('Lỗi: ' + error.message);
    }
  }
};

//==================================================HÀM DELETE PRODUCT
const deleteProduct = async (productId) => {
  const confirmDelete = confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?");
  if (confirmDelete) {
    try {
      const response = await axios.delete(`/api-product/delete/${productId}`);
      alert(response.data.message); // Hiển thị thông báo thành công
      TableDataAccount(); // Tải lại bảng sản phẩm
      resetForm();
      // Refresh the product list or perform any additional action as needed
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product: " + error.response.data.message);
    }
  }
};

//===========================================RESET PRODUCT
function resetForm() {
  document.getElementById('name').value = ''; // Tên khóa học
  document.getElementById('price').value = ''; // Giá khóa học
  document.getElementById('CategorydeId').value = ''; // Loại categorydeId
  document.getElementById('CategorydeName').value = ''; // Loại categorydeName
  document.getElementById('parentCategoryId').value = ''; // Loại categoryId
  document.getElementById('parentCategoryName').value = ''; // Loại categoryName
  document.getElementById('createDate').value = ''; // Ngày tạo
  document.getElementById('qtyInput').value = ''; // Số lượng
  document.getElementById('description').value = ''; // Mô tả

  // Reset checkbox
  const availableCheckbox = document.getElementById('available');
  availableCheckbox.checked = false; // Đánh dấu uncheck checkbox

  // Reset input file và ảnh xem trước
  const fileInput = document.getElementById('fileInput');
  fileInput.value = ''; // Đặt giá trị input file về rỗng

  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = ''; // Hoặc một URL mặc định
  imagePreview.style.display = 'none'; // Ẩn ảnh xem trước
}

//===========================================ADD PRODUCT
document.getElementById('addProductBtn').addEventListener('click',
    async function () {
      // Lấy thông tin sản phẩm từ các trường nhập liệu
      const name = document.getElementById('name').value;
      const image = document.getElementById('fileInput').files.length > 0
          ? document.getElementById('fileInput').files[0].name : null;
      const price = parseFloat(document.getElementById('price').value); // Chuyển đổi giá thành số
      const createDate = document.getElementById('createDate').value;
      const qty = parseInt(document.getElementById('qtyInput').value);
      const mota = document.getElementById('description').value;
      const available = document.getElementById('available').checked;
      // Lấy thông tin danh mục
      const categoryId = document.getElementById('CategorydeId').value;
      const categoryName = document.getElementById('CategorydeName').value;
      const parentCategoryId = document.getElementById(
          'parentCategoryId').value;
      const parentCategoryName = document.getElementById(
          'parentCategoryName').value;

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
        image: image,
        price: price,
        createDate: createDate,
        available: available,
        categoryde: categoryDetail, // Sử dụng đối tượng categoryDetail đã tạo ở trên
        qty: qty,
        mota: mota
      };

      // Gửi yêu cầu đến API
      try {
        const response = await fetch(
            'http://localhost:8080/api-product/add-product', {
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

//=======================================Hiện image tu type input file lên form
// Hàm để khởi tạo hình ảnh mặc định khi tải trang
function setDefaultImage() {
  const imagePreview = document.getElementById('imagePreview');
  imagePreview.src = '/IMG/default-image.webp'; // Thay thế với đường dẫn đến hình ảnh mặc định của bạn
}

// Hàm để xử lý sự kiện thay đổi tệp
document.getElementById('fileInput').addEventListener('change',
    function (event) {
      const file = event.target.files[0]; // Lấy tệp được chọn
      const imagePreview = document.getElementById('imagePreview');

      if (file) {
        // Tạo một URL từ tệp đã chọn
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result; // Cập nhật src của <img> với dữ liệu hình ảnh
        };
        reader.readAsDataURL(file); // Đọc tệp dưới dạng dữ liệu URL
      } else {
        setDefaultImage(); // Nếu không có tệp nào được chọn, đặt lại hình ảnh mặc định
      }
    });
window.onload = setDefaultImage;


// ==============================================
// Hàm xử lý thay đổi bộ lọc
function handleFilterChange() {
  const select = document.getElementById('filterSelect');
  const priceFilterDiv = document.getElementById('priceFilterDiv');
  const dateFilterDiv = document.getElementById('dateFilterDiv');

  if (select.value === '1') {
    priceFilterDiv.style.display = 'block';
    dateFilterDiv.style.display = 'none';
  } else if (select.value === '2') {
    priceFilterDiv.style.display = 'none';
    dateFilterDiv.style.display = 'block';
  } else {
    priceFilterDiv.style.display = 'none';
    dateFilterDiv.style.display = 'none';
  }

  // Khi người dùng thay đổi bộ lọc, sẽ gọi hàm lọc
  filterTableData();
}

// Hàm lọc dữ liệu bảng dựa trên giá và ngày
function filterTableData() {
  const priceFilterInput = parseFloat(document.getElementById('priceFilter').value);
  const dateFilterInput = document.getElementById('dateFilter').value;
  const table = document.getElementById("myTable");
  const tr = table.getElementsByTagName("tr");

  for (let i = 1; i < tr.length; i++) { // Bắt đầu từ 1 để bỏ qua tiêu đề
    const priceCell = tr[i].getElementsByTagName("td")[3]; // Cột Price
    const dateCell = tr[i].getElementsByTagName("td")[4]; // Cột Date
    let displayRow = true; // Mặc định hàng sẽ được hiển thị

    // Lọc theo giá
    if (!isNaN(priceFilterInput)) { // Kiểm tra nếu giá nhập là một số
      const priceValue = parseFloat(priceCell.textContent.replace(/\./g, "").replace(/\s/g, "").replace('₫', ""));
      if (priceValue > priceFilterInput) {
        displayRow = false; // Hàng không hiển thị nếu giá cao hơn giá lọc
      }
    }

    // Lọc theo ngày
    if (dateFilterInput) {
      const rowDateValue = new Date(dateCell.textContent);
      const selectedDate = new Date(dateFilterInput);
      if (rowDateValue.toDateString() !== selectedDate.toDateString()) {
        displayRow = false; // Hàng không hiển thị nếu ngày không khớp
      }
    }

    // Hiển thị hoặc ẩn hàng
    tr[i].style.display = displayRow ? "" : "none";
  }
}