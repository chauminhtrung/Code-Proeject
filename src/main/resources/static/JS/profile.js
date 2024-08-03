
// Lấy username của người dùng đã đăng nhập
let username = document.getElementById("usernameid").textContent;
let email = document.getElementById('Email');
let fullname = document.getElementById('Fullname');
let password = document.getElementById('Password');
let image= document.getElementById('imgUser');
let image2 =document.getElementById('imgUser2')
let image3 =document.getElementById('imgUser3');
let filename = document.getElementById('photoFileName');
document.addEventListener('DOMContentLoaded', function() {
    // Lấy thông tin tài khoản từ API
    axios.get(`/api-accounts/get-account/${username}`)
        .then(function (response) {
            // Cập nhật nội dung modal
            email.value = response.data.email;
            fullname.value = response.data.fullname;
            password.value = response.data.password;
            image.src = `/IMG/${response.data.photo}`;
            image2.src = `/IMG/${response.data.photo}`;
            image3.src = `/IMG/${response.data.photo}`;
        })
        .catch(function (error) {
            console.error('Error fetching account data:', error);
        });
});
function updateImage(input) {
    const imgElement = document.getElementById('imgUser');

    if (input.files && input.files.length === 1) {
        const file = input.files[0];
        const fileName = file.name;
        filename.value = fileName;
        if (file.type.startsWith('image/')) {
            imgElement.src = URL.createObjectURL(file);
        }
    }
}
function updateUserInfo() {
    // Lấy các giá trị từ form

    const updatedUserInfo = {
        username: username,
        email: email.value,
        fullname: fullname.value,
        password: password.value,
        photo: filename.value
    };

    // Gửi dữ liệu đến API để cập nhật
    axios.put(`/api-accounts/update-acc?username=${username}`, updatedUserInfo)
        .then(function (response) {
            console.log('Cập nhật tài khoản thành công:', response.data);
            // Hiển thị thông báo thành công hoặc thực hiện các hành động khác
            Swal.fire({
                title: "Good job!",
                text: "Update Success!",
                icon: "success"
            }).then(() =>{
                window.location.href="/home";
            });

        })
        .catch(function (error) {

            console.error('Lỗi khi cập nhật tài khoản:', error);
            // Hiển thị thông báo lỗi hoặc thực hiện các hành động khác
        });
}

