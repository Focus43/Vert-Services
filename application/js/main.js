

    // @application :: namespace
    var snowPro = angular.module('snowPro', ['ngResource', 'vertservice']);

    /**
     * On initialize
     */
    snowPro.run(function( $rootScope ){
        // hardcoded for now...
        $rootScope.userID = '13a4604b-433e-de11-9555-005056834df6';
    });


    var vertService = angular.module('vertservice', ['ngResource']).
        config(function($httpProvider){
    //        $httpProvider.defaults.headers.common['Authorization'] = ProCard.securitytoken;   // replace with token
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        }).
        factory('ProCard', function($resource, $rootScope) {

            var ProCard = $resource('http://rest.thesnowpros.org/member/:verb', { verb: '@verb', callback: 'JSON_CALLBACK'}, {
                get: { method: 'JSONP', params: { memnum:$rootScope.userID } },
                send: { method: 'POST' }
            });

            ProCard.prototype.send = function (config, cb) {
                // send request to vert server
                return ProCard.send(config,
                    angular.extend({}, this, {_id:undefined}), cb);
            };

            ProCard.prototype.update = function(cb) {
                return ProCard.update({personId: this.personId},
                    angular.extend({}, this, {_id:undefined}), cb);
            };

            return ProCard;
        }).
        factory("Calendar", function ($resource, $rootScope) {

            var Calendar = $resource('http://rest.thesnowpros.org/division/meetings', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { memnum:$rootScope.userID } }
            });

            return Calendar;
        });



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
//    snowPro.factory('ProCard', ['$resource', function( $resource ){
//        return $resource('http://rest.thesnowpros.org/member/procard', {callback: 'JSON_CALLBACK'}, {
//            get: {method: 'JSONP'}
//        });
//    }]);




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

//        ProCard.get({}, function(data){
//            $scope._proCard = data;
//            console.log(data);
//        });

        ProCard.get({ verb:'procard' }, function( data ) {
            $scope._procard = data;
            console.log(data);
        });

//        ProCard.get({ verb:'contacts' }, function( data ) {
//            $scope._contacts = data;
//        });

    }]);


    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', function( $scope, $rootScope, $resource, Calendar ){
        $rootScope.pageName = 'Calendar';

        this.Sessions = $resource('http://rest.thesnowpros.org/meeting/sessions', { callback: 'JSON_CALLBACK' }, {
            get: { method: 'JSONP', isArray: true, params: { id: "@id" } }
        });

        Calendar.get( { det: 'snap' }, function (data) {
            $scope.events = data;
        });

        $scope.controller = this;

        $scope.showDetail = function (meeting, $event) {
            var _target = $($event.target);

            this.controller.Sessions.get({ id: meeting.meetingId }, function (data) {
                console.log(data);
                $scope.sessions = data;
                var eventDetail = $('#event-detail');
//                eventDetail.show();
//                eventDetail.html(data);

            });

        };

    });


    /**
     * Contacts controller
     */
    snowPro.controller('ContactsCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Contacts';
    });
