const app = angular.module("myApp",[]);
app.controller("myCtrl",function ($scope,$http) {
    let host = "http://localhost:8080/api-roles/rest";


    $scope.GetAll = function (){
        $http.get(`${host}/authorities`).then(resp => {
            $scope.db = resp.data;
            console.log(resp.data)
        })
    }

    $scope.GetAll();

    $scope.index_of = function (username,roleId) {
        return $scope.db.authorities.findIndex(a => a.account.username == username && a.role.id == roleId)
    }

    $scope.update = function (username,roleId) {

        var index= $scope.index_of(username,roleId);
        console.log(index)
        if(index>=0) {
            var id = $scope.db.authorities[index].id;
            var url = `${host}/authorities/${id}`;
            $http.delete(url).then(resp => {
                $scope.db.authorities.splice(index,1);
                Swal.fire({
                    title: "Good job!",
                    text: "Chinh Thanh Cong!!!",
                    icon: "success"
                });
            })

        }
        else {
            var authority = {
                account:{username:username},
                role:{id:roleId}
            };
            console.log(authority)
            var url = `${host}/authorities`;
            $http.post(url,authority).then(resp => {
                $scope.db.authorities.push(resp.data);
                Swal.fire({
                    title: "Good job!",
                    text: "Chinh Thanh Cong!!!",
                    icon: "success"
                });
            })
        }
    }

    $scope.handleFilterChange = function (){
        if($scope.myValue == "All" ) {
            $scope.GetAll();
        }
        else {
            $http.get(`${host}/authoritiesbyR?role=${$scope.myValue}`).then(resp => {
                $scope.db = resp.data;
                console.log(resp.data)
            })
        }
    }
    $scope.SearchAccount = function (){
        $http.get(`${host}/authoritiesbyU?username=${$scope.myValue}`).then(resp => {
            $scope.db = resp.data;
            console.log(resp.data)
        })
    }


});
