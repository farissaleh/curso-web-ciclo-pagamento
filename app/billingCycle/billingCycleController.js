(function() {
    angular.module('primeiraApp').controller('BillingCycleCtrl', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        'consts',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs, consts){
        var vm = this
        const url = `${consts.apiUrl}/billingCycles`
        const paginacao = 2;

        this.$onInit = function(){
            vm.refresh()
        }


        vm.create = function(){

            $http.post(url, vm.billingCycle)
            .then(function(response){
                vm.refresh()       
                msgs.addSuccess('Operação Realizada com sucesso!!')        
            })
            .catch( response => msgs.addError(response.data.errors))

        }

        vm.refresh = function(){
            const page = parseInt($location.search().page) || 1 //Pega o param page na url
            const urlPage = `${url}?skip=${(page - 1) * paginacao}&limit=${paginacao}`

            $http.get(urlPage).then(function(response) {
                vm.billingCycle = {credits:[{}],debts:[{}]}//Objetos vazios para inicializar a lista de inclusão no html
                vm.billingCycles = response.data
                vm.calculateValues()
                
                //Paginação
                $http.get(`${url}/count`)
                .then( function(response){
                    vm.pages = Math.ceil(response.data.value / paginacao)// Math.ceil arredonda p cima
                    tabs.show(vm, {tabList: true, tabCreate: true}) //Tabs apos verificação do count de paginação
                })
                
            })
            .catch( error => console.log(error))
        }

        vm.showTabUpdate = function(billingCycle){
            vm.billingCycle = billingCycle
            vm.calculateValues()//Para calcular os valores do summary
            tabs.show(vm, {tabUpdate: true})
        }

        vm.showTabDelete = function(billingCycle){
            vm.billingCycle = billingCycle
            vm.calculateValues()//Para calcular os valores do summary
            tabs.show(vm, {tabDelete: true})
        }

        vm.showTabView = function(billingCycle){
            vm.billingCycle = billingCycle
            vm.calculateValues()//Para calcular os valores do summary
            tabs.show(vm, {tabView: true})
        }

        vm.update = function () {
            const updateUrl = `${url}/${vm.billingCycle._id}`

            $http.put(updateUrl, vm.billingCycle)
            .then(function(response){
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            })
            .catch(e => msgs.addError(e.data.errors))


        }

        vm.delete = function(){
            const deleteUrl = `${url}/${vm.billingCycle._id}`
            $http.delete(deleteUrl, vm.billingCycle)
            .then(function(response) {
                vm.refresh()
                msgs.addSuccess('Operação realizada com sucesso!')
            } )
            .catch(e =>  msgs.addError(e.data.errors))
        }

        // vm.showTab = function(billingCycle, tab){
        //     vm.billingCycle = billingCycle
        //     tabs.show(vm, {tab: true})
        // }

        vm.addCredit = function(index){
            vm.billingCycle.credits.splice(index+1,0, {})
        }

        vm.cloneCredit = function(index, {name, value}){
            vm.billingCycle.credits.splice(index+1, 0,  {name, value})
            vm.updateCreditValues()
        }

        vm.deleteCredit = function(index){
            if(vm.billingCycle.credits.length > 1){
                vm.billingCycle.credits.splice(index, 1)
            }else{
                vm.billingCycle.credits[index] = {}
            }
            vm.updateCreditValues()
        }
        
        vm.addDebt = function(index){
            vm.billingCycle.debts.splice(index+1, 0, {})
        }

        vm.cloneDebt = function(index, {name, value, status}){
            vm.billingCycle.debts.splice(index+1, 0, {name, value, status})
            vm.updateDebtValues()
        }

        vm.deleteDebt = function(index){
            if(vm.billingCycle.debts.length > 1){
                vm.billingCycle.debts.splice(index, 1)
            }else{
                vm.billingCycle.debts[index] = {}
            }
            vm.updateDebtValues()
        }

        vm.calculateValues= function(){
            // vm.credit = 0
            // vm.debt = 0

            // if(vm.billingCycle){
            //     vm.billingCycle.credits.forEach(c => vm.credit += !c.value || isNaN(c.value) ? 0 : parseFloat(c.value))
            //     vm.billingCycle.debts.forEach(d => vm.debt += !d.value || isNaN(d.cvalue) ? 0 : parseFloat(d.value))
            // }
            // vm.total = vm.credit - vm.debt

            vm.updateCreditValues()
            vm.updateDebtValues()
        }

        vm.updateCreditValues = function (){
            vm.credit = 0
            if(vm.billingCycle)
                vm.billingCycle.credits.forEach(c => vm.credit += !c.value || isNaN(c.value) ? 0 : parseFloat(c.value))
            vm.total = vm.credit - vm.debt
        }

        vm.updateDebtValues = function (){
            vm.debt = 0
            if(vm.billingCycle)
                vm.billingCycle.debts.forEach(d => vm.debt += !d.value || isNaN(d.value) ? 0 : parseFloat(d.value))
            vm.total = vm.credit - vm.debt
        }
        

        
    }
})()