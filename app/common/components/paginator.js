//Componente para Controle de paginação
angular.module('primeiraApp').component('paginator', {
bindings:{
    url: '@', //url base para concatenar com o page
    pages: '@' //Qntd de paginas q devem ser rendereizados no paginador (1,2,3)
},
controller: [
    '$location',//Para ver os param da url
    function($location){
        
        this.$onInit = function () {
            var pages = parseInt(this.pages) || 1 // Parseia p inteiro c default 1
            //Array(pages) criar um array c 
            //.fill(0) preenche array c 0
            //.map((e,i) => i+1 ) mapeia o array fazendo c q cada el receba seu index +1
            this.pagesArray = Array(pages).fill(0).map((e,i) => i + 1 )// obtem os n do paginator
            this.current = parseInt($location.search().page) || 1
            this.needPaginaton = this.pages > 1
            this.hasPrev = this.current > 1
            this.hasNext = this.current < this.pages

            this.isCurrent = function(i){
                return i == this.current
            }
        }
        
        
    }
],
template: `
    <ul ng-if="$ctrl.needPaginaton" class="pagination pagination-sm no-margin pull-right"> 
        <li ng-if="$ctrl.hasPrev">
            <a href="{{$ctrl.url}}?page={{ $ctrl.current - 1 }}"><</a>
        </li>

        <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
            <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
        </li>

        <li ng-if="$ctrl.hasNext">
            <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1 }}">></a>
        </li>
    </ul>
`
})
