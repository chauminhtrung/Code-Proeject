const getAllProduct = async () => {
  try {
    const response = await axios.get('/api-product/get-all-product');
    const productList = response.data.data;

    let carouselHtml = '';
    productList.forEach(product => {
      carouselHtml += `
        <div class="item" style="width: 300px;height: 480px;">
          <div class="card">
            <a href="#"><img src="/IMG/${product.image}" alt="course" class="card-img-top" width="300" height="170"></a>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="badge bg-info-soft">Intermediate</span>
                <a href="#" class="fs-5"><i class="fa-solid fa-heart align-middle"></i></a>
              </div>
              <div style="height: 50px">
                <h4 class="mb-2 text-truncate-line-2"><a href="/detail" class="text-inherit">${product.name}</a></h4>
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
            <!-- Card Footer -->
            <div class="card-footer">
              <div class="row align-items-center g-0">
                <div class="col">
                  <h5 class="mb-0">${product.price}</h5>
                </div>
                <div class="col-auto">
                  <a href="/detail" class="text-inherit">
                    <i class="fe fe-shopping-cart text-primary align-middle me-2"></i>
                    Get Enrolled
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    const carouselElement = document.querySelector('.owl-carousel');
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
};

document.addEventListener('DOMContentLoaded', getAllProduct);


//detail
const getDetail = async () => {
  let urlPath = window.location.pathname;
  let id = urlPath.split('/').pop();
  let container = $('#getDetail');
  await axios.get('/api-product/findProductById?id=${id}')
  .then(response => {
    container.html('');
    console.log(response.data.data);
    if (response.data.data==null){
      container.html('<p>Không tìm thấy khách sạn phù hợp.</p>');
      return;
    }
    response.data.data.forEach(detail => {
      let html = `
               
                `;
      container.append(html);
    });
  })
  .catch(error => {
    alert(error);
  });
}
// Gọi hàm getAllProduct khi trang được tải
document.addEventListener('DOMContentLoaded', getDetail);

