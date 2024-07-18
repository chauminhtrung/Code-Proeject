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
                  <span class="text-dark fw-bold h2">$ ${product.price}</span>
                  <del class="fs-4">$750</del>
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

const category = async () => {
  let productContainer = $('#category');

  const getCategoryDetails = async (categoryId, dropdownMenu) => {
    try {
      const response = await axios.get(`/api-category/category-detail?categoryId=${categoryId}`);
      dropdownMenu.html('');
      response.data.data.forEach(categoryDetail => {
        dropdownMenu.append(`<li class="mt-2"><a class="dropdown-item fs-6" href="#">${categoryDetail.name}</a></li>`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  await axios.get('/api-category/get-all-category').then(response => {
    productContainer.html('');
    response.data.data.forEach(cate => {
      let dropdownMenu = $('<ul class="dropdown-menu bg-light" style="width: 320px;height: 637px;"></ul>');

      let listItem = $(`  
        <li class="dropend mt-3">  
          <a class="dropdown-item fs-6" data-bs-toggle="dropdown" aria-expanded="false" data-category-id="${cate.id}">  
            <div class="d-flex">  
              <p>${cate.name}</p>  

              <b class="ms-auto"><i class="bi bi-chevron-right"></i></b>  
            </div>  
          </a>  
        </li>  
      `);

      listItem.append(dropdownMenu);

      productContainer.append(listItem);

      listItem.on('click', async function() {
        await getCategoryDetails(cate.id, dropdownMenu);
      });
    });
  })
  .catch(error => {
    alert(error);
  });
}
// Gọi hàm category khi trang được tải
document.addEventListener('DOMContentLoaded', category);


