(function (){
    //Factory p simplificar o controle de abas
    angular.module('primeiraApp').factory('tabs', TabsFacotry)

    function TabsFacotry() {

        function show(owner, {// Recebe um onjeto nesses padrões
            tabList = false,
            tabView = false,
            tabCreate = false,
            tabUpdate= false,
            tabDelete= false
        }){
            owner.tabList = tabList
            owner.tabView = tabView
            owner.tabCreate = tabCreate 
            owner.tabUpdate = tabUpdate
            owner.tabDelete = tabDelete
        }

        return { show }
        
    }
})()