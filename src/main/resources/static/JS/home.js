const renderProductCard = (product) => {
  return `  
    <div class="item" style="width: 300px;height: 480px;">  
      <div class="card">  
        <a class="click-detail" data-id="${product.id}" href="#"><img src="/IMG/${product.image}" alt="course" class="card-img-top" width="300" height="170"></a>  
        <div class="card-body">  
          <div class="d-flex justify-content-between align-items-center mb-3">  
            <span class="badge bg-info-soft">Intermediate</span>  
            <a href="#" class="fs-5"><i class="fa-solid fa-heart align-middle"></i></a>  
          </div>  
          <div style="height: 50px">  
            <h4 class="mb-2 text-truncate-line-2"><a class="click-detail" data-id="${product.id}" href="#" class="text-inherit">${product.name}</a></h4>  
          </div>  
          <small>By: Claire Evans</small>  
          <div class="lh-1 mt-3">  
            <span class="align-text-top">  
              <span class="fs-6">  
                <i class="bi bi-star-fill text-warning"></i>  
                <i class="bi bi-star-fill text-warning"></i>  
                <i class="bi bi-star-fill text-warning"></i>  
                <i class="bi bi-star-fill text-warning"></i>  
                <i class="bi bi-star-fill text-warning"></i>  
              </span>  
            </span>  
            <span class="text-warning">4.5</span>  
            <span class="fs-6">(9,300)</span>   
          </div>  
        </div>  
        <div class="card-footer">  
          <div class="row align-items-center g-0">  
            <div class="col">  
              <h5 class="mb-0">${product.price}</h5>  
            </div>  
            <div class="col-auto">  
              <button class="click-detail" data-id="${product.id}">Xem thêm</button>  
            </div>  
          </div>  
        </div>  
      </div>  
    </div>  
  `;
};

const getAllProduct = async () => {
  try {
    const response = await axios.get('/api-product/get-all-product');
    const productList = response.data.data;

    let carouselHtml = '';
    productList.forEach(product => {
      carouselHtml += renderProductCard(product);
    });

    const carouselElement = document.querySelector('.mostpopular');
    carouselElement.innerHTML = carouselHtml;

    $(carouselElement).owlCarousel({
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  $('.click-detail').click(function () {
    const id = $(this).data('id');
    window.location.href = `/detail/id?id=${id}`;
  });

};

const getAllRandom = async () => {
  try {
    const response = await axios.get('/api-product/get-all-random');
    const productList = response.data.data;

    let carouselHtml = '';
    productList.forEach(product => {
      carouselHtml += renderProductCard(product);
    });

    const carouselElement = document.querySelector('.random');
    carouselElement.innerHTML = carouselHtml;

    $(carouselElement).owlCarousel({
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  $('.click-detail').click(function () {
    const id = $(this).data('id');
    window.location.href = `/detail/id?id=${id}`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getAllProduct();
  getAllRandom();
});




// =============================================================================
const getCategories = async () => {
  try {
    const response = await axios.get('/api-product/get-all-category');
    const categories = response.data.data;
    renderTabs(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

const renderTabs = (categories) => {
  const tabList = document.getElementById('pills-tab');
  const tabContent = document.getElementById('pills-tabContent');

  categories.forEach((category) => {
    // Tạo tab
    const tabItem = document.createElement('li');
    tabItem.className = "nav-item";
    tabItem.innerHTML = `  
      <a class="nav-link" id="pills-${category.id}-tab" data-bs-toggle="pill" href="#pills-${category.id}" role="tab" aria-controls="pills-${category.id}" aria-selected="false">${category.name}</a>  
    `;
    tabList.appendChild(tabItem);

    // Tạo pane
    const tabPane = document.createElement('div');
    tabPane.className = "tab-pane fade";
    tabPane.id = `pills-${category.id}`;
    tabPane.setAttribute('role', 'tabpanel');
    tabPane.setAttribute('aria-labelledby', `pills-${category.id}-tab`);
    tabContent.appendChild(tabPane);

    // Gọi API để lấy sản phẩm cho danh mục
    fillProductByCategory(category.id);
  });
};

const fillProductByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/api-product/products-categoryId?categoryId=${categoryId}`);
    const products = response.data.data;

    const tabPane = document.getElementById(`pills-${categoryId}`);
    tabPane.innerHTML = ''; // Xóa nội dung cũ trước khi thêm mới

    if (!products || products.length === 0) {
      tabPane.innerHTML = '<p>Không có sản phẩm nào trong danh mục này.</p>';
      return;
    }

    // Thêm carousel vào tabPane
    const carouselContainer = document.createElement('div');
    carouselContainer.className = 'mostpopular owl-carousel';

    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.className = 'product-card';

      productItem.innerHTML = `  
        <div class="item" style="width: 300px;height: 480px;">  
          <div class="card">  
            <a class="click-detail" data-id="${product.id}" href="#">  
              <img src="/IMG/${product.image}" alt="course" class="card-img-top" width="300" height="170">  
            </a>  
            <div class="card-body">  
              <div class="d-flex justify-content-between align-items-center mb-3">  
                <span class="badge bg-info-soft">Intermediate</span>  
                <a href="#" class="fs-5"><i class="fa-solid fa-heart align-middle"></i></a>  
              </div>  
              <div style="height: 50px">  
                <h4 class="mb-2 text-truncate-line-2">  
                  <a class="click-detail" data-id="${product.id}" href="#" class="text-inherit">${product.name}</a>  
                </h4>  
              </div>  
              <small>By: Claire Evans</small>  
              <div class="lh-1 mt-3">  
                <span class="align-text-top">  
                  <span class="fs-6">  
                    <i class="bi bi-star-fill text-warning"></i>  
                    <i class="bi bi-star-fill text-warning"></i>  
                    <i class="bi bi-star-fill text-warning"></i>  
                    <i class="bi bi-star-fill text-warning"></i>  
                    <i class="bi bi-star-fill text-warning"></i>  
                  </span>  
                </span>  
                <span class="text-warning">4.5</span>  
                <span class="fs-6">(9,300)</span>  
              </div>  
            </div>  
            <div class="card-footer">  
              <div class="row align-items-center g-0">  
                <div class="col">  
                  <h5 class="mb-0">${product.price}</h5>  
                </div>  
                <div class="col-auto">  
                  <button class="click-detail" data-id="${product.id}">Xem thêm</button>  
                </div>  
              </div>  
            </div>  
          </div>  
        </div>  
      `;
      carouselContainer.appendChild(productItem);
    });

    tabPane.appendChild(carouselContainer);

    // Khởi tạo Owl Carousel
    $(carouselContainer).owlCarousel({
      loop: false,
      margin: 10,
      nav: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
  }
  $('.click-detail').click(function () {
    const id = $(this).data('id');
    window.location.href = `/detail/id?id=${id}`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getCategories(); // Gọi hàm để lấy danh mục và sản phẩm
});