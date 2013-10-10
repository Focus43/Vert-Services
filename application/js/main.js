
    // @application :: namespace
    var proCard = angular.module('proCard', ['ngResource']);


    proCard.config(function($routeProvider){
        $routeProvider.when('/pro-card', {
            controller: 'RouteController',
            templateUrl: '_pro-card.html'
        }).otherwise({
            redirectTo: '/',
            templateUrl: '_login.html'
        });
    });


    // http://stackoverflow.com/questions/12008908/how-can-i-pass-variables-between-controllers-in-angularjs
    proCard.service('sharedProperties', function(){
        var pageName = 'Login';

        return {
            getPageName: function(){
                return pageName;
            },
            setPageName: function(value){
                pageName = value;
            }
        };
    });


    proCard.controller('TopbarController', function( $scope ){
        $scope.pageName = 'Login';
    });


    proCard.controller('RouteController', function( $scope, $injector ){
        $scope.nav = function(_route){
            
            //console.log(_route);
        };
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
