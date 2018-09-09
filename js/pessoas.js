var app = angular.module('app', []);

app.controller('pessoasController', function ($scope, PessoaService) {

    $scope.namePattern = /^(([A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ][a-záàâãéèêíïóôõöúçñ]*[\s]?([a-z]{1,3})*[\s]?([A-ZÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ][a-záàâãéèêíïóôõöúçñ])*)*)+$/;

    $scope.pessoas = PessoaService.lista();

    $scope.salvar = function () {
        $scope.submitForm = function(isValid) {
            if (isValid) {
                PessoaService.inserir($scope.pessoa);
                limpar();
                $scope.limparModel();
            }
        };
    }

    $scope.limparModel = function(){
        $scope.pessoa = {};
    }

    $scope.excluir = function (indice) {
        PessoaService.apagar(indice);
    }

    $scope.ordem = $scope.pessoas.slice();

    /* Embaralhar sequencia */

    shuffle($scope.ordem);


    /* Repetir sequencia*/

    var count = 0;
    for(var i=0; i<10; i++){
        if(typeof($scope.ordem[i]) != 'undefined'){
            count++;
        }else{
            var pos = i - count;
            if(i >= (count + count)){
                pos = pos - count;
                if(pos >= count){
                    pos = pos - count;
                }
            }
            $scope.ordem[i] = {};
            $scope.ordem[i] = $scope.ordem[pos];
        }
    }

});

app.factory('PessoaService', function () {

    var pessoas = JSON.parse(window.localStorage.getItem('db_pessoas') || '[]');

    function persistir() {
        window.localStorage.setItem('db_pessoas', JSON.stringify(pessoas));
    }

    return {

        lista: function () {
            return pessoas;
        },

        inserir: function (pessoa) {
            if(pessoas.length < 10){
                var exist = false;
                for(var i = 0; i < pessoas.length; i++){
                    if(pessoas[i].nome == pessoa.nome) {
                        exist = true;
                        break;
                    }
                }
                if(exist){
                    alert("O nome já existe");
                }
                else{
                    pessoas.push(pessoa);
                    persistir();
                }
            }else{
                alert("o máximo é 10");
            }
        },

        apagar: function (indice) {
            pessoas.splice(indice, 1);
            persistir();
        }

    }

});

function shuffle(array) {

    var m = array.length, t, i;
  
    while (m) {
  
      i = Math.floor(Math.random() * m--);
  
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}

function limpar(){
    document.getElementById("nome").value="";
}
