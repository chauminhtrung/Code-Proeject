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
        console.log(username)
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
                    <input type="text" name="username" value="${acc.username}"  class="bg-light form-control" placeholder="trung"/>
                </div>
                <div class="col-md-6 pt-md-0 pt-3">
                    <label>Password</label>
                    <input type="password" value="${acc.password}" name="password" class="bg-light form-control" placeholder="***"/>
                </div>
            </div>
            <div class="row py-2">
                <div class="col-md-6 pt-md-0 pt-3">
                    <label>Fullname:</label>
                    <input type="text" value="${acc.fullname}" name="fullname" class="bg-light form-control" placeholder="Chau Minh Trung"/>
                </div>
                <div class="col-md-6">
                    <label>Email Address</label>
                    <input type="email" value="${acc.email}" name="email" class="bg-light form-control" placeholder="minhtrung@gmail.com"/>
                </div>
            </div>
        
            <div class="py-3 pb-4 border-bottom">
                <button class="btn btn-primary mr-3">Save Changes</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>

      `
        formEditAccount.insertAdjacentHTML('beforeend', Account);

    } catch (error) {
        console.error(error);
    }

};







