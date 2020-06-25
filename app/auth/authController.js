(function() {

    angular.module('primeiraApp').controller('AuthCtrl', [
        '$location',
        'msgs',
        'authFactory',
        AuthController
    ])

    function AuthController($location, msgs, authFactory) {
        const vm = this

        //Para controlar se a rela é o login ou cadastro
        vm.loginMode = true

        //Trocar o modo
        vm.changeMode = () => vm.loginMode = !vm.loginMode

       
        vm.login = () => {
            authFactory.login(vm.user, err => {
                err ? msgs.addError(err) : $location.path('/')
            })
        }

        vm.signup = () => {
            authFactory.signup(vm.user, err => {
                err ? msgs.addError(err) : $location.path('/')
            })
        }

        
        //Função q retorna um objeto
        vm.getUser = () => authFactory.getUser()

        vm.logout = () => {
            authFactory.logout(() => $location.path('/'))
        }
    }

})()