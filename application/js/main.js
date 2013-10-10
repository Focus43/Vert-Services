
    // @application :: namespace
    var proCard = angular.module('proCard', [$routeProvider]);


    proCard.config(function($routeProvider){
        $routeProvider.when('/pro-card', {
            controller: 'RouteController',
            templateUrl: '_pro-card.html'
        });
    });


    proCard.controller('RouteController', function( $scope ){

    });


    proCard.controller('LoginController', function( $scope ){
        $scope.submit = function(){
            console.log(this);
        };
    });


    /**
     * @note Corresponds to <el toggle-class="" />
     */
    proCard.directive('toggleClass', function(){
        return function(scope, element, attrs){
            element.bind('click', function(){
                var selector_class = attrs.toggleClass.split(',');
                angular.element( document.querySelector(selector_class[0]) )
                       .toggleClass(selector_class[1]);
            });
        };
    });
