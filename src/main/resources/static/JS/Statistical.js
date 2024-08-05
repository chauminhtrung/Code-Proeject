
const TableDataCourseTop = async () => {
    const trTableDataAcc = document.getElementById('TableTotalCourse');
    trTableDataAcc.innerHTML = '';
    try {
        const response = await axios.get(`/api-reports/get-all-report`);
        const items = response.data.data;
    let i =1;
        items.forEach(report => {

            let listAccount = `  
               <tr class="text-center">
               <td>${i++}</td>  
                <td>${report[0]}</td>                
                <td>${report[1]}</td>
                <td>${report[2].toLocaleString(
                'vi-VN', { style: 'currency', currency: 'VND' })    }</td>
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
document.addEventListener('DOMContentLoaded', TableDataCourseTop);





const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Error deleting product: " + error.response.data.message);
        }

};

const fetchDataReportBymonth = async (month) => {
    try {
        let total = 0;
        const response = await axios.get(`/api-reports/get-all-reportBYmonth?month=${month}`);
        const items = response.data.data;
        items.forEach(report => {
            total+=report[2];
        });
        return total;
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product: " + error.response.data.message);
    }

};

const getALltotal = async () => {
    try {
        let total = 0;
        const response = await axios.get(`/api-reports/get-all-report`);
        const items = response.data.data;
        items.forEach(report => {
            total+=report[2];
        });
        return total.toLocaleString(
            'vi-VN', { style: 'currency', currency: 'VND' });
    }catch (error) {
        console.error("Error deleting product:", error);
        alert("Error deleting product: " + error.response.data.message);
    }
}
// bieu do tron
async function drawChart() {

    let [userData, courseData, topicData] = await Promise.all([
        fetchData('/api-accounts/get-all-account'),
        fetchData('/api-product/get-all-product'),
        fetchData('/api-category/get-all-category')
    ]);

    if (!userData || !courseData || !topicData) {
        console.error('Failed to fetch data');
        return;
    }

    let numberOfUsers = userData.data.length;
    let numberOfCourses = courseData.data.length;
    let numberOfTopics = topicData.data.length;

    document.getElementById('numberOfUsers').innerText = numberOfUsers;
    document.getElementById('numberOfCourses').innerText = numberOfCourses;
    document.getElementById('numberOfTopics').innerText = numberOfTopics;

    let ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Users', 'Courses', 'Thematics'],
            datasets: [{
                label: 'Dữ liệu thống kê',
                data: [numberOfUsers, numberOfCourses, numberOfTopics],
                backgroundColor: ['#ee99a0', '#8aadf4', '#a6da95'],
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: "Be Vietnam Pro",
                            size: 16
                        }
                    }
                }
            }
        }
    });
}

// bieu do cot
async function drawChart2() {
    const ctx = document.getElementById('myChartAll');
    console.log(await fetchDataReportBymonth(7))
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January','February ','March', 'April', 'May', 'June', 'July','August','September',
            'October','November','December'],
            datasets: [{
                label:
                    'total all: ' + await getALltotal() ,
                data: [await fetchDataReportBymonth(1),await fetchDataReportBymonth(2),await fetchDataReportBymonth(3),await fetchDataReportBymonth(4),
                    await fetchDataReportBymonth(5),await fetchDataReportBymonth(6),await fetchDataReportBymonth(7),await fetchDataReportBymonth(8),await fetchDataReportBymonth(9),
                    await fetchDataReportBymonth(10),await fetchDataReportBymonth(11),await fetchDataReportBymonth(12)],

                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}

drawChart();
drawChart2();
