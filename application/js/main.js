
    // @application :: namespace
    var proCard = angular.module('proCard', ['ngResource']);


    /**
     * On initialize
     */
    /*proCard.run(function( $rootScope ){
        $rootScope.pageName = 'Vert';
    });*/


    /**
     * Config (routes)
     */
    proCard.config(function($routeProvider, $locationProvider){
        // push state vs hash-based urls
        $locationProvider.html5Mode(true);

        $routeProvider.when('/pro-card', {templateUrl: '_pro-card.html', controller: 'ProCardCtrl'})
            .when('/report-card', {templateUrl: '_report-card.html', controller: 'ReportCardCtrl'})
            .when('/calendar', {templateUrl: '_calendar.html', controller: 'CalendarCtrl'})
            .when('/contacts', {templateUrl: '_contacts.html', controller: 'ContactsCtrl'})
            .otherwise({
                redirectTo: '/',
                templateUrl: '_login.html',
                controller: 'LoginCtrl'
            });
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


    /**
     * Login controller
     */
    proCard.controller('LoginCtrl', ['$scope', '$rootScope', '$http', function( $scope, $rootScope ){
        $rootScope.pageName = 'Login';
    }]);


    /**
     * Procard controller
     */
    proCard.controller('ProCardCtrl', ['$scope', '$rootScope', '$http', function( $scope, $rootScope ){
        $rootScope.pageName = 'Pro Card';
    }]);


    /**
     * Report card controller
     */
    proCard.controller('ReportCardCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Report Card';
    });


    /**
     * Calendar controller
     */
    proCard.controller('CalendarCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Calendar';
    });


    /**
     * Contacts controller
     */
    proCard.controller('ContactsCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Contacts';
    });
