
    // @application :: namespace
    var proCard = angular.module('proCard', []);


    proCard.controller('LoginController', function( $scope ){

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
