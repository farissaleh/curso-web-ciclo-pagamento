(function() {
    angular.module('primeiraApp').factory('msgs',[
        'toastr',
        MsgsFactory
    ])
    
    function MsgsFactory(toastr){
    
        // toastr[method](msg, title)
        //'Nova' forma de chamr methodo do objeto
        //Ajuda p passar o methos invocado por parâmetro como string
        // obj.get() === obj['get']
        function addMsg(msgs, title, method){
            if( msgs instanceof Array){
                msgs.forEach(msg => toastr[method](msg, title))
            }else{
                toastr[method](msgs, title)
            }
        }

        function addSuccess(msgs){
            addMsg(msgs, 'Sucesso', 'success')
        }

        function addError(msgs){
            addMsg(msgs, 'Erro', 'error')
        }

        return { addSuccess, addError }
    }
})()