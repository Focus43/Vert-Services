/**
 * VertSolutions / The Snow Pros angular app.
 *
 * @resource Listing: rest.thesnowpros.org/map?ctyp=json
 * @type {*}
 */

    // @application :: namespace
    var snowPro = angular.module('snowPro', ['ngResource', 'vertservice']);


    /**
     * On initialize
     */
    snowPro.run(function( $rootScope ){
        // hardcoded for now...
        $rootScope.userID = '13a4604b-433e-de11-9555-005056834df6';

        // right sidebar includes
        $rootScope.sidebar = {
            incld: ''
        };
    });


    var vertService = angular.module('vertservice', ['ngResource']).
        config(function($locationProvider, $httpProvider, $routeProvider){
            // push state vs hash-based urls
            $locationProvider.html5Mode(true);

            // routes
            $routeProvider.when('/pro-card', {templateUrl: '_pro-card.html', controller: 'ProCardCtrl'})
                .when('/report-card', {templateUrl: '_report-card.html', controller: 'ReportCardCtrl'})
                .when('/calendar', {templateUrl: '_calendar.html', controller: 'CalendarCtrl'})
                .when('/contacts', {templateUrl: '_contacts.html', controller: 'ContactsCtrl'})
                .otherwise({
                    redirectTo: '/',
                    templateUrl: '_login.html',
                    controller: 'LoginCtrl'
                });

            // $httpProvider.defaults.headers.common['Authorization'] = ProCard.securitytoken;   // replace with token
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
//                getSessionsForId: { method: 'JSONP', isArray: true, params: { id: "@id" } }
            });

//            Calendar.prototype.getSessions = function (id, cb) {
//                console.log("getSessions : " + id);
//                return Calendar.getSessionsForId({ verb: "sessions" }, { id: id },
//                    angular.extend({}, this, {_id:undefined}), cb);
//            };

            return Calendar;
        }).
        factory("Sessions", function($resource, $rootScope) {
            var Sessions = $resource('http://rest.thesnowpros.org/meeting/sessions', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { id: "@id" } },
                getSessionsForId: { method: 'JSONP', isArray: true, params: { id: "@id" } }
            });

            Sessions.prototype.getSessions = function (id, cb) {
                console.log("getSessions");
                console.log(cb);
                return Sessions.getSessionsForId({}, { id: id },
                    angular.extend({}, this, {_id:id}), cb);
            };

            return Sessions;
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
     * Slide-in sidebar controller
     */
    snowPro.controller('LeftSidebarCtrl', ['$scope', '$http', function( $scope, $http ){
        $http.jsonp('http://rest.thesnowpros.org/asea/sitelinks?callback=JSON_CALLBACK').success(function( data ){
            $scope.links = data;
        });
    }]);

    /**
     * Login controller
     */
    snowPro.controller('LoginCtrl', ['$scope', '$rootScope', function( $scope, $rootScope ){
        $rootScope.pageName = 'Login';
    }]);

    /**
     * Procard controller
     */
    snowPro.controller('ProCardCtrl', ['$scope', '$rootScope', 'ProCard', function( $scope, $rootScope, ProCard ){
        $rootScope.pageName = 'Pro Card';

        $rootScope.sidebar.incld = '_pro-card-edit.html';

        ProCard.get({ verb:'procard' }, function( data ) {
            $scope._proCard = data;
        });

//        ProCard.get({ verb:'contacts' }, function( data ) {
//            $scope._contacts = data;
//        });
    }]);

    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', function( $scope, $rootScope, $resource, Calendar, Sessions ){
        $rootScope.pageName = 'Calendar';

        $scope.sidebar.incld = '_calendar-sessions.html';

        $scope.controller = this;

//        this.Sessions = $resource('http://rest.thesnowpros.org/meeting/sessions', { callback: 'JSON_CALLBACK' }, {
//            get: { method: 'JSONP', isArray: true, params: { id: "@id" } }
//        });

        Calendar.get( { det: 'snap' }, function (data) {
            $scope.events = data;
        });

        $scope.getSessionsForMeeting = function (event, events) {
            var _sessions = new Sessions();
            _sessions.getSessions(event.meetingId, function (data) {
                console.log("done");
//                $rootScope.sessions = data;
//                $scope.sessions = data;
//
//                angular.element( document.querySelector("#bodyWrap") )
//                    .toggleClass("show-right");

            });
        };
    });

    /**
     * Sessions controller
     */
//    snowPro.controller('SessionsCtrl', ['$scope', '$rootScope', 'Sessions', function( $scope, $rootScope, Sessions ){
//
//        Sessions.get({}, function( data ) {
//            $scope.sessions = data;
//            console.log(data);
//        });
//    }]);
//

    /**
     * Contacts controller
     */
    snowPro.controller('ContactsCtrl', function( $scope, $rootScope ){
        $rootScope.pageName = 'Contacts';
    });
