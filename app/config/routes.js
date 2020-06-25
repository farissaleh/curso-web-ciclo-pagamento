angular.module('primeiraApp').config([
    '$stateProvider',//Dep do UI router
    '$urlRouterProvider',//Dep do UI router
    '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider){
        //Ui ROuter funcino com estados, toda vez q o estado for dashboard ele carregrá o html na ui-view no index html
        $stateProvider.state('dashboard', {
            url: "/dashboard",
            templateUrl: "dashboard/dashboard.html"
        }).state('billingCycle', {
            url: "/billingCycles?page",//Tem q colocar o page aqui p ui router entender q esse param pode ser utilizado
            templateUrl: "billingCycle/tabs.html"
        })

        //Add um interceptor para os metodos http
        $httpProvider.interceptors.push('handleResponseError')

       // $urlRouterProvider.otherwise('/dashboard') //Se não corresponder a nenhuma estado voltar p url
}])
//Run executado logo após o config
.run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'authFactory',
    function($rootScope, $http, $location, $window, authFactory){
        validateUser()
        //locationChangeStart toda atualização de localização(telas) executa validate
        $rootScope.$on('$locationChangeStart', () => validateUser())

        function validateUser(){
            const user = authFactory.getUser()
            const authPage = '/auth.html'
            const isAuthPage = $window.location.href.includes(authPage)

            if (!user && !isAuthPage) {
                //redireciona p pagina de autenticaçaõ
                $window.location.href = authPage
            }else if ( user && !user.isValid){
                
                authFactory.validateToken(user.token, (err, valid) =>{
                    if (!valid) {
                        $window.location.href = authPage
                    }else {
                        user.isValid = true
                        $http.defaults.headers.common.Authorization = user.token //Não é necessário?
                        isAuthPage ? $window.location.href = '/' : $location.path('/dashboard')
                    }
                })
            }
        }
    }
])