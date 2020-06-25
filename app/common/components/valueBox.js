(function () {
    angular.module('primeiraApp').component('valueBox', {
        bindings: {
            grid: '@',
            colorClass: '@',
            value: '@',
            text: '@',
            iconClass: '@'
        },
    
        //Controller para adicionar comportamento ao componente
        //Para acessar os binds no controller usar this.
        controller: [
            'gridSystem',
            function (gridSystem) {
                this.$onInit = () => this.gridClasses = gridSystem.toCssClasses(this.grid)
            }
        ],
    
        template: `
        <div class="{{ $ctrl.gridClasses }}">
            <div class="small-box {{ $ctrl.colorClass }}">
                    <div class="inner">
                        <h3>{{ $ctrl.value }}</h3>
                        <p>{{ $ctrl.text }}</p>
                    </div>
                    <div class="icon">
                        <i class="{{ $ctrl.iconClass }} "></i>
                    </div>
            </div>
        </div>
    
        
        `
    })
})()