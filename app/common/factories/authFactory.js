(function() {
    angular.module('primeiraApp').factory('authFactory', [
        '$http',
        'consts',
        AuthFacotry
    ])

    function AuthFacotry($http,consts){

        let user = null

        function getUser() {
            if (!user) {
                user = JSON.parse(localStorage.getItem(consts.userKey))
            }
            return user
        }

        function login(user, callback){
            submit('login', user, callback)
        }

        function signup(user, callback){
            submit('signup', user, callback)
        }

        function submit(url, user, callback) {

            $http.post(`${consts.oapiUrl}/${url}`, user)
            .then(response => {
                
                const user = response.data
                localStorage.setItem(consts.userKey , JSON.stringify(user))//localStorage.setItem() setar item no localstorage
                //Setta todos os header do http(do angular) com Authorization c o token
                $http.defaults.headers.common.Authorization = user.token

                if (callback) callback(null, user)
            })
            .catch(response => {
                console.log('CATCH')
                if (callback) callback(response.data.errors, response.data)
            })
        }

        function logout(callback){
            localStorage.removeItem(consts.userKey)
            user = null
            $http.defaults.headers.common.Authorization = ''
            if(callback) callback(null)
        }

        function validateToken(token, callback){
            if (token) {
                $http.post(`${consts.oapiUrl}/validateToken`, { token })
                    .then( resp => {
                        if(resp.data.valid){
                            $http.defaults.headers.common.Authorization = getUser().token
                        }else {
                            logout()
                        }
                        if (callback) callback(null, resp.data.valid)
                    }).catch( resp => {
                        if (callback)  callback(resp.data.errors)
                    })
            }else {
                if (callback) callback('Token inválido')
            }
        }
        
        
        return { login , signup , logout , getUser , validateToken}
    }
})()