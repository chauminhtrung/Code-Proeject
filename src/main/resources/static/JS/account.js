let lengtItem;
const TableDataAccount = async () => {
    const trTableDataAcc = document.getElementById('TableAccount');
    trTableDataAcc.innerHTML = '';
    try {
        const response = await axios.get(`/api-accounts/get-all-account`);
        const items = response.data.data;

        let paper = {
            page: 0,
            size: 10,
            get items() {
                var start = this.page * this.size;
                lengtItem = items.length;
                const pageCount = document.getElementById("CountPage");
                pageCount.innerHTML = this.page + 1 + " " + "of" + " " + this.count;
                return items.slice(start, start + this.size);

            },
            get count() {
                return Math.ceil(1.0 * items.length / this.size);
            },
        }

        paper.items.forEach(AccountDetail => {
            let listAccount = `  
               <tr class="text-center">
                <td>${AccountDetail.username}</td>                
                <td>*****</td>
                <td>${AccountDetail.fullname}</td>
                <td>${AccountDetail.email}</td>
                <td>${AccountDetail.photo}</td>
                 <td>
                    <button class="btn btn-danger m-1 click-delete" data-id="${AccountDetail.username}">Remove</button>
                    <button class="btn btn-info click-edit" data-id="${AccountDetail.username}">Edit</button>

                 </td>
            </tr>
      `
            trTableDataAcc.insertAdjacentHTML('beforeend', listAccount);
        });
    } catch (error) {
        console.error(error);
    }
    $('.click-edit').click(function () {
        const username = $(this).data('id');
        const tabTrigger = new bootstrap.Tab(
            document.getElementById('ex1-tab-2'));
        tabTrigger.show();
        EditAccountWUser(username);
    });

    $('.click-delete').click(function () {
        const username = $(this).data('id');
        deleteAcc(username);
    });


};
document.addEventListener('DOMContentLoaded', TableDataAccount);

// su kien nut dieu huong
const TableDataAccountPage = async (numberpage) => {
    const trTableDataAcc = document.getElementById('TableAccount');
    trTableDataAcc.innerHTML = '';
    try {
        const response = await axios.get(`/api-accounts/get-all-account`);
        const items = response.data.data;

        let paper = {
            page: numberpage,
            size: 10,
            get items() {
                var start = this.page * this.size;
                lengtItem = items.length;
                const pageCount = document.getElementById("CountPage");
                pageCount.innerHTML = this.page + 1 + " " + "of" + " " + this.count;
                return items.slice(start, start + this.size);

            },
            get count() {
                return Math.ceil(1.0 * items.length / this.size);
            },
        }

        paper.items.forEach(AccountDetail => {

            let listAccount = `  
               <tr class="text-center">

                <td>${AccountDetail.username}</td>                
                <td>*****</td>
                <td>${AccountDetail.fullname}</td>
                <td>${AccountDetail.email}</td>
                <td>${AccountDetail.photo}</td>
                 <td>
                    <button class="btn btn-danger m-1 click-delete" data-id="${AccountDetail.username}">Remove</button>
                    <button class="btn btn-info click-edit" data-id="${AccountDetail.username}">Edit</button>
                 </td>
            </tr>
      `
            trTableDataAcc.insertAdjacentHTML('beforeend', listAccount);
        });
    } catch (error) {
        console.error(error);
    }
    $('.click-edit').click(function () {
        const username = $(this).data('id');
        const tabTrigger = new bootstrap.Tab(
            document.getElementById('ex1-tab-2'));
        tabTrigger.show();
        EditAccountWUser(username);
    });
    $('.click-delete').click(function () {
        const username = $(this).data('id');
        deleteAcc(username);
    });


};


let paper = {
    page: 0,
    size: 10,
    first() {
        this.page = 0;
        TableDataAccountPage(this.page)

    },
    prev() {
        this.page--;
        if (this.page < 0) {
            this.last();
        }
        TableDataAccountPage(this.page);

    },
    next() {
        this.page++;
        if (this.page >= this.count) {
            this.first();
        }
        TableDataAccountPage(this.page);

    },
    last() {
        this.page = this.count - 1;
        TableDataAccountPage(this.page);

    },
    get count() {
        return Math.ceil(1.0 * lengtItem / this.size);
    },

}

//-------------------------Edit Account----------------------------//
const EditAccountWUser = async (username) => {
    const formEditAccount = document.getElementById('editAccountForm');
    formEditAccount.innerHTML = '';
    try {
        const response = await axios.get(
            `/api-accounts/get-account?username=${username}`);
        const acc = response.data.data;

            let Account = `  
                    <h4 class="pb-4 border-bottom" style="letter-spacing: -1px;font-weight: 400;">Account</h4>
                    <div class="d-flex align-items-start py-3 border-bottom">
            <img style="  width: 170px; height: 150px;border-radius: 6px;object-fit: cover;"
                 src="/IMG/user.webp"
                 class="img" alt=""/>
            <div class="pl-sm-4 pl-2" id="img-section" style="margin-left: 20px">
                <b>Profile Photo</b>
                <p>Accepted file type .png. Less than 1MB</p>
                <button class="btn button border"><b>Upload</b></button>
            </div>
        </div>
        <div class="py-2">
            <div class="row py-2">
                <div class="col-md-6">
                    <label>Username:</label>
                    <input type="text" name="username" id="username" value="${acc.username}"  class="bg-light form-control" placeholder="trung"/>
                </div>
                <div class="col-md-6 pt-md-0 pt-3">
                    <label>Password</label>
                    <input type="password" id="password" value="${acc.password}" name="password" class="bg-light form-control" placeholder="***"/>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-6 pt-md-0 pt-3">
                    <label>Fullname:</label>
                    <input type="text" id="fullname" value="${acc.fullname}" name="fullname" class="bg-light form-control" placeholder="Chau Minh Trung"/>
                </div>
                <div class="col-md-6">
                    <label>Email Address</label>
                    <input type="email" id="email" value="${acc.email}" name="email" class="bg-light form-control" placeholder="minhtrung@gmail.com"/>
                </div>
            </div>
        
            <div class="py-3 pb-4 border-bottom">
                <button class="btn btn-primary mr-3 click-update" data-id="${acc.username}">Save Changes</button>
                <button class="btn btn-danger click-delete" data-id="${acc.username}">Delete</button>
            </div>
        </div>

      `
        formEditAccount.insertAdjacentHTML('beforeend', Account);

    } catch (error) {
        console.error(error);
    }
    $('.click-delete').click(function () {
        const username = $(this).data('id');
        deleteAcc(username);
        window.location.href = `/manager/Accounts`;
    });

    $('.click-update').click(function () {
        const username = $(this).data('id');
        updateAcc(username);
    });

};

//------------------------- DELETE Account----------------------------//
const deleteAcc = async (username) => {
    const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa Account ${username} không?`);
    if (confirmDelete) {
        try {
            const response = await axios.delete(`/api-accounts/delete?username=${username}`);
            alert(response.data.message); // Hiển thị thông báo thành công
            TableDataAccount();
            // Refresh the product list or perform any additional action as needed
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product: " + error.response.data.message);
        }
    }
};

//------------------------- Update Account----------------------------//
const updateAcc = async (username) => {

    try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;

        const responseAcc = await axios.get(
            `/api-accounts/get-account?username=${username}`);
        const acc = responseAcc.data.data;
        acc.username = username;
        acc.password = password;
        acc.fullname = fullname;
        acc.email = email;
        const updateRe = await axios.put(`/api-accounts/update-acc?username=${username}`, acc);
        if (updateRe.data.status) {
            alert('Cập nhật Account thành công!');
            // Có thể thực hiện các bước khác như làm mới dữ liệu hoặc chuyển hướng về trang danh sách sản phẩm
            TableDataAccount();
        } else {
            alert('Cập nhật Account thất bại: ' + updateRe.data.message);
        }


    }catch (error){
        console.error("Error deleting product:", error);
        alert("Error deleting product: " + error.response.data.message);
    }


}



