/* jshint esversion: 8 */
const detail1 = async () => {
  const container = document.getElementById('detailProduct');
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  container.innerHTML = '';
  try {
    const response = await axios.get(
        `/api-product/detail-product?id=${productId}`);
    const product = response.data.data;
    const html = `  
      <h1 class="text-white display-4 fw-semibold detail-name">${product.name}</h1>  
      <h6 class="text-white mb-4 detail-descrip">${product.mota}</h6> 
    `;
    container.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Có lỗi xảy ra khi gọi API.</p>';
  }
};

const detail2 = async () => {
  const container = document.getElementById('detail1'); // Lấy phần tử mới để hiển thị hình ảnh
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  container.innerHTML = '';
  try {
    const response = await axios.get(
        `/api-product/detail-product?id=${productId}`);
    const product = response.data.data;
    const html = `  
                <div class="d-flex justify-content-center align-items-center">
                  <img class="rounded" src="/IMG/${product.image}" height="210" width="395">
                  <a class="position-absolute icon-shape rounded-circle btn-play icon-xl"
                     href="https://www.youtube.com/watch?v=Nfzi7034Kbg">
                    <i class="bi bi-play"></i>
                  </a>
                </div>
                <div class="ms-4 mt-2">
                  <span class="text-dark fw-bold h2">${product.price.toFixed(
        0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</span>
                </div>
                
               <div class="card-body">
                <div class="d-grid">
                  <a onclick="addCart(${product.id})" class="btn btn-primary mb-2">Start Free Month</a>
                  <a href="#" class="btn btn-outline-primary">Get Full Access</a>
                </div>
              </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    console.error(error);
    container.innerHTML = '<p>Có lỗi xảy ra khi gọi API.</p>';
  }
};
document.addEventListener('DOMContentLoaded', detail1);
document.addEventListener('DOMContentLoaded', detail2);



//=============================DETAIL-CATEGORIES================================

const loadProductDetails = async (productId) => {
  const pro = $(`#productDetail-${productId}`);
  const response = await axios.get(`/api-product/get-products-by-category-detail?categoryDetailId=${productId}`);
  const productDetails = response.data.data;
  console.log(productDetails)
  productDetails.forEach(product => {
    const detailProduct = $(`  
                <li class="nav-item mt-3">  
                    <a href="#" class="nav-link text-dark click-detail" data-id="${product.id}">${product.name} </a> 
                </li>  
            `);
    pro.append(detailProduct);
  });
  $('.click-detail').click(function () {
    const id = $(this).data('id');
    window.location.href = `/detail/id?id=${id}`;
  });
};

const loadCategories = async () => {
  const dropdownMenu = $('#categoryDropdown');
  try {
    const response = await axios.get('/api-category/get-all-category');
    const categories = response.data.data;
    categories.forEach(category => {
      const listItem = $(`  
                <li class="nav-item mt-3">  
                    <div class="dropend mt-3">  
                        <a href="#" type="button" class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown"  
                           aria-expanded="false" data-bs-auto-close="outside" data-category-id="${category.id}">  
                           ${category.name}  
                        </a>  
                        <ul id="category-detail-${category.id}" class="dropdown-menu rounded bg-light" style="width: 330px; height: 637px;">  
                        </ul>  
                    </div>  
                </li>  
            `);

      // Thêm sự kiện click cho danh mục
      listItem.find('a.dropdown-item').on('click', async (event) => {
        const categoryId = $(event.currentTarget).data('category-id');
        const submenu = $(`#category-detail-${categoryId}`);
        const response = await axios.get(`/api-category/category-detail?categoryId=${categoryId}`);
        const categoryDetails = response.data.data;
        console.log(categoryDetails)
        categoryDetails.forEach(detail => {
          const detailItem = $(`  
                            <li class="nav-item mt-3">  
                                <div class="dropend mt-3">  
                                    <a href="#" type="button" class="dropdown-item dropdown-toggle productDetail"  data-bs-toggle="dropdown" 
                                       data-categorydetail-id="${detail.id}">  
                                       ${detail.name}  
                                    </a>  
                                    <ul id="productDetail-${detail.id}" class="dropdown-menu rounded bg-light" style="width: 330px; height: 637px;">  
                                    </ul>  
                                </div>  
                            </li>  
                        `);
          submenu.append(detailItem);
        });
        // Gán sự kiện cho các mục sản phẩm
        submenu.find('.productDetail').on('click', async (e) => {
          const productId = $(e.currentTarget).data('categorydetail-id');
          await loadProductDetails(productId); // Gọi hàm loadProductDetails khi nhấn vào sản phẩm
        });
      });
      dropdownMenu.append(listItem);
    });

  } catch (error) {
    console.error(error);
    dropdownMenu.html('<p>Có lỗi xảy ra khi gọi API.</p>');
  }
};

document.addEventListener('DOMContentLoaded', loadCategories);







