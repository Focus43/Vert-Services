
    /**
     * @note Corresponds to <el toggle-class="selector,class-to-toggle" />
     */
    angular.module('snowPro').directive('toggleClass', function(){
        return function(scope, element, attrs){
            element.bind('click', function(){
                var selector_class = attrs.toggleClass.split(',');
                angular.element( document.querySelector(selector_class[0]) )
                    .toggleClass(selector_class[1]);
            });
        };
    });


    angular.module('snowPro').directive('toggleSiblingVisibility', function(){
        return function(scope, $element, attr){
            $element.on('click', function(){
                console.log('test', $element.siblings(attr));
                $element.siblings(attr).toggle();
            });
        };
    });