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
      loop: true,
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
  $('.click-detail').click(function() {
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
      loop: true,
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

  $('.click-detail').click(function() {
    const id = $(this).data('id');
    window.location.href = `/detail/id?id=${id}`;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  getAllProduct();
  getAllRandom();
});
// =============================================================================
const fillCategoryMenu = async () => {
  try {
    const response = await axios.get('/api-category/get-all-category');
    const categories = response.data.data;

    const navList = document.getElementById('pills-tab');

    categories.forEach((category, index) => {
      const navItem = document.createElement('li');
      navItem.className = 'nav-item';

      const navLink = document.createElement('a');
      navLink.className = 'nav-link';
      navLink.setAttribute('id', `pills-${category.name.toLowerCase()}-tab`);
      navLink.setAttribute('data-toggle', 'pill');
      navLink.setAttribute('href', `#pills-tab${index + 1}`); // Thêm index + 1 vào ID của tab
      navLink.setAttribute('role', 'tab');
      navLink.setAttribute('aria-controls', `pills-tab${index + 1}`); // Thêm index + 1 vào aria-controls
      navLink.setAttribute('aria-selected', 'false');
      navLink.setAttribute('tabindex', '-1');
      navLink.innerText = category.name;

      navLink.addEventListener('click', function(event) {
        event.preventDefault();

        const activeTab = document.querySelector('.nav-link.active');
        if (activeTab) {
          activeTab.classList.remove('active');
        }

        this.classList.add('active');

        // Ẩn tất cả các tab content
        const tabContents = document.querySelectorAll('.tab-pane');
        tabContents.forEach(tab => {
          tab.classList.remove('active', 'show');
        });

        // Lấy ID của tab content tương ứng với tab được click
        const targetTabId = this.getAttribute('href').substring(1);
        const targetTabContent = document.getElementById(targetTabId);

        // Hiển thị tab content tương ứng
        if (targetTabContent) {
          targetTabContent.classList.add('active', 'show');
        }
      });

      navItem.appendChild(navLink);
      navList.appendChild(navItem);
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', fillCategoryMenu);