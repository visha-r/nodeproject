var app = angular.module('AngularApp', ['ngRoute']);

app.controller('MainController', function ($scope, $route) {

});

app.config(function ($routeProvider) {
    $routeProvider
     .when('/home', {
         templateUrl: 'Wallpaper.html'
     })

     .when('/search', {
         templateUrl: 'SearchWithEdit.html',
         controller: 'searchController'
     })

     .when('/favorites', {
         templateUrl: 'favorites.html',
         controller: 'FavouritesController'
     });

});

app.controller('searchController', function ($scope, $http, ProductService) {
    ProductService.fetchProducts(sku, function (response) {
        $scope.products = response.products;
        console.log($scope.products);
    });

    $scope.addToFavorites = function (product) {
        ProductService.addToFavorites(product);
    }

    $scope.remove = function (id) {
        ProductService.remove(id, function (response) {
            $scope.products = response.products;
            console.log($scope.products);
        });
    }

   /* $scope.addProduct = function (product) {
        ProductService.addProduct(product, function (response) {
            $scope.products = response.products;
            console.log($scope.products);
        });
    }*/

});

app.controller('FavouritesController', function ($scope, ProductService) {
    $scope.favoriteProducts = ProductService.getFavorites();
    console.log($scope.favoriteProducts);
});


