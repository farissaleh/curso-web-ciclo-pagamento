angular.module('primeiraApp').constant('consts',{
    appName: 'Primeira App',
    version: '1.0.0',
    year: '2020',
    apiUrl:'http://localhost:3003/api',
    oapiUrl:'http://localhost:3003/oapi',
    userKey: '_app_user'
}).run([
    '$rootScope',    
    'consts', 
    function ($rootScope, consts){
        $rootScope.consts = consts
    }
])

//Criação de constantes no angular