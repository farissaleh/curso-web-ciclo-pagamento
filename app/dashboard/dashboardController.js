(function(){ //Remove o controller do escope global, agora ele pertence a essa funcçaõ

    angular.module('primeiraApp').controller('DashboardCtrl', [
        '$http',
        'consts',
        DashboardController
    ])
    
    function DashboardController($http,consts) {
        var vm = this //viewModel, this = scope local
    
        vm.getSummary = function () {
            const url = `${consts.apiUrl}/billingSummary`
            //{credit, debt} destructing : já me passe o atributo credit e deb do objeto
            $http.get(url).then(function(response) {
                
                const {credits = 0, debts = 0} = response.data
                vm.credit = credits
                vm.debt = debts
                vm.total = credits - debts
            }).catch((error) => console.log(error))
        }
        this.$onInit = function(){
            vm.getSummary()
        }
    }

})()