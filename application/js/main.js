
    // @application :: namespace
    var snowPro = angular.module('snowPro', ['ngResource']);


    /**
     * On initialize
     */
    snowPro.run(function( $rootScope ){
        // hardcoded for now...
        $rootScope.userID = '13a4604b-433e-de11-9555-005056834df6';
    });


    /**
     * Config (routes)
     */
    snowPro.config(function($locationProvider, $httpProvider, $routeProvider){
        // push state vs hash-based urls
        $locationProvider.html5Mode(true);

        // Fix CORS pre-flighting
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
     * Factories
     */
    snowPro.factory('ProCard', ['$resource', function( $resource ){
        return $resource('http://rest.thesnowpros.org/member/procard', {callback: 'JSON_CALLBACK'}, {
            get: {method: 'JSONP'}
        });
    }]);


    /**
     * @note Corresponds to <el toggle-class="" />
     */
    snowPro.directive('toggleClass', function(){
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
    snowPro.controller('LoginCtrl', ['$scope', '$rootScope', '$http', function( $scope, $rootScope ){
        $rootScope.pageName = 'Login';
    }]);


    /**
     * Procard controller
     */
    snowPro.controller('ProCardCtrl', ['$scope', '$rootScope', 'ProCard', function( $scope, $rootScope, ProCard ){
        $rootScope.pageName = 'Pro Card';

        ProCard.get({id: $scope.userID}, function(data){
            $scope._proCard = data;
            console.log(data);
        });
    }]);


    /**
     * Report card controller
     */
    snowPro.controller('ReportCardCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Report Card';
    });


    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Calendar';
    });


    /**
     * Contacts controller
     */
    snowPro.controller('ContactsCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Contacts';
    });
