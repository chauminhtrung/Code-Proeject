const TableDataAccount = async () => {
    const trTableDataAcc = document.getElementById('TableAccount');
    trTableDataAcc.innerHTML = '';
    try {
        const response = await axios.get(`/api-accounts/get-all-account`);
        response.data.data.forEach(AccountDetail => {

            let listAccount = `  
               <tr class="text-center">
                <td>${AccountDetail.username}</td>                
                <td>*****</td>
                <td>${AccountDetail.fullname}</td>
                <td>${AccountDetail.email}</td>
                <td>${AccountDetail.photo}</td>
                 <td>
                    <button class="btn btn-danger m-1">Remove</button>
                    <button class="btn btn-info">Edit</button>
                 </td>
            </tr>
      `
            trTableDataAcc.insertAdjacentHTML('beforeend',listAccount);
        });
    } catch (error) {
        console.error(error);
    }

};
document.addEventListener('DOMContentLoaded', TableDataAccount);