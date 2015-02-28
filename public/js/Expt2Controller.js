var app = angular.module('AngularApp', ['ngRoute']);

app.controller('MainController', function ($scope, $route) {

});

app.config(function ($routeProvider) {
    $routeProvider
     .when('/home', {
         templateUrl: 'Wallpaper.html'
     })

     .when('/search', {
         templateUrl: 'SearchWithFavorites.html',
         controller: 'searchController'
     })

     .when('/favorites', {
         templateUrl: 'favorites.html',
         controller: 'FavouritesController'
     });

});

app.controller('searchController', function ($scope, $http) {
        $http.get('/getDetails')
        	.success(function(response){
        		$scope.products = response;
                console.log($scope.products);
        	});
        
        $scope.addToFavorites = function (product) {
        	$http.post('/addFavorite',product);
        };  
        
        $scope.add = function(product){
        	console.log('hleooo');
        	product.image = '';
        	$http.post('/add', product)
        	.success(function(response){
        		$scope.products = response;
        	});
        }
    });

       
app.controller('FavouritesController', function ($scope, $http) {
        $http.get('/favorites')
        .success(function (response) {
        	$scope.favoriteProducts = response;
        });
        console.log($scope.favoriteProducts);
});


