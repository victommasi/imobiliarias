angular.module('setup', ['ngRoute','templates', 'ngResource'])

.config(function($routeProvider) {
    $routeProvider
        .when('/imobiliarias', {
            templateUrl: 'imobiliaria-lista.html',
            controller: 'ImobiliariaListaCtrl'
        })
        .when('/imobiliaria/new', {
            templateUrl: 'imobiliaria-novo.html',
            controller: 'ImobiliariaNovoCtrl'
        })
        .when('/imobiliaria/:id/edit', {
            templateUrl: 'imobiliaria-detalhe.html',
            controller: 'ImobiliariaDetalheCtrl'
        })
        .otherwise({
        	redirectTo: '/imobiliarias'
    	});
})

.controller('ImobiliariaListaCtrl', ['$http', '$scope', 'ImobiliariasFactory', 'ImobiliariaFactory', '$location',
	function($http, $scope, ImobiliariasFactory, ImobiliariaFactory, $location) {

		 // callback for ng-click 'adicionar':
	    $scope.novaImobiliaria = function () {
	        $location.path('/imobiliaria/new');
	    };

	    // callback for ng-click 'deletar':
	    $scope.deletarImobiliaria = function (imobiliariaId) {
	        ImobiliariaFactory.delete({ id: imobiliariaId });
	        $scope.imobiliarias = ImobiliariasFactory.query();
	    };

	    // callback for ng-click 'editar':
	    $scope.editarImobiliaria = function (imobiliariaId) {
	        $location.path('/imobiliaria/' + imobiliariaId + "/edit");
	    };

	    $scope.imobiliarias = ImobiliariasFactory.query();
	  	//$http.get('assets/ng-app/imobiliarias.json').success(function(data) {
	    //  	$scope.imobiliarias = data;
	   	//});
}])

.controller('ImobiliariaNovoCtrl', ['$scope', 'ImobiliariasFactory', '$location',
	function($scope, ImobiliariasFactory, $location) {

	    // callback for ng-click 'adicionar':
	    $scope.adicionarImobiliaria = function () {
	        ImobiliariasFactory.create($scope.imobiliaria);
	        $location.path('/imobiliarias');
	    }
}])

.controller('ImobiliariaDetalheCtrl', ['$scope', 'ImobiliariaFactory', '$location', '$routeParams',
	function($scope, ImobiliariaFactory, $location, $routeParams) {
		 
		// callback for ng-click 'atualizar':
        $scope.atualizarImobiliaria = function () {
            ImobiliariaFactory.update($scope.imobiliaria);
            $location.path('/imobiliarias');
        };

        // callback for ng-click 'cancelar':
        $scope.cancelar = function () {
            $location.path('/imobiliarias');
        };

        $scope.imobiliaria = ImobiliariaFactory.show({id: $routeParams.id});
}])

.factory('ImobiliariasFactory', function($resource) {
    return $resource('/imobiliarias.json', {}, {
        query: { 
        	method: 'GET', 
        	isArray: true 
        },
        create: { 
        	method: 'POST' 
        }
    })
})

.factory('ImobiliariaFactory', function($resource) {
    return $resource('/imobiliarias/:id.json', {}, {
        show: { 
        	method: 'GET' 
    	},
        update: { 
        	method: 'PUT', 
        	params: {
        		id: '@id'
        	} 
        },
        delete: { 
        	method: 'DELETE', 
        	params: {
        		id: '@id'
        	} 
        }
    })
})