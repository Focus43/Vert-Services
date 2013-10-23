
    /*jQuery(document, window).on('resize orientationchange webkitfullscreenchange fullscreenchange', function(){
        alert('full screen!');
    });

    alert(window.navigator.standalone);*/

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
        config(['$locationProvider', '$httpProvider', '$routeProvider', '$compileProvider', function($locationProvider, $httpProvider, $routeProvider, $compileProvider){
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

            // white-list the tel: prefix for urls so we can auto-link phone numbers for mobile
            // https://groups.google.com/forum/#!topic/angular/YiP02I1wkNU
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

            // $httpProvider.defaults.headers.common['Authorization'] = ProCard.securitytoken;   // replace with token
            delete $httpProvider.defaults.headers.common["X-Requested-With"];
        }]).
        factory('ProCard', ['$resource', '$rootScope', function($resource, $rootScope) {

            var ProCard = $resource('http://rest.thesnowpros.org/member/procard', { callback: 'JSON_CALLBACK'}, {
                get: { method: 'JSONP', params: { memnum:$rootScope.userID } },
                send: { method: 'POST' }
            });

            ProCard.prototype.send = function (config, cb) {
                // send request to vert server
                return ProCard.send(config,
                    angular.extend({}, this, {_id:undefined}), cb);
            };

            ProCard.prototype.update = function(cb) {
//                return ProCard.update({memnum: this.contactId},
//                    angular.extend({}, this, {_id:undefined}), cb);
            };

            return ProCard;
        }]).
        factory("Calendar", ['$resource', '$rootScope', function ($resource, $rootScope) {
            /*var Calendar = $resource('http://rest.thesnowpros.org/division/meetings', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { memnum:$rootScope.userID } }
            });*/
            var Calendar = $resource('http://10.0.5.130\\:8080/ajax_mocks/meetings.json', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { memnum:$rootScope.userID } }
            });

            return Calendar;
        }]).
        factory('Contacts', ['$resource', function( $resource ){
            var ContactList = $resource('http://rest.thesnowpros.org/member/contacts', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true }
            });

            return ContactList;
        }]).
        factory("Sessions", ['$resource', function($resource) {
            var Sessions = $resource('http://rest.thesnowpros.org/meeting/sessions', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { id: "@id" } }
            });

            return Sessions;
        }]);


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

        ProCard.get({}, function( data ) {
            $scope._proCard = data;
        });

        $scope.showEditForm = function( ){
            $rootScope.$broadcast('loadCardEditForm', $scope._proCard);
        };

    }]);

    snowPro.controller('EditProCardCtrl', ['$scope', '$resource', 'ProCard', function($scope, $resource, ProCard){

        this.Schools = $resource('http://rest.thesnowpros.org/member/schools', { callback: 'JSON_CALLBACK' }, {
            get: { method: 'JSONP', isArray: true, params: { id: "@id", img: true } }
        });
        this.Designations = $resource('http://rest.thesnowpros.org/member/professionaldesignations', { callback: 'JSON_CALLBACK' }, {
            get: { method: 'JSONP', isArray: true, params: { id: "@id", img: true  } }
        });
        $scope.controller = this;

        $scope.$on('loadCardEditForm', function( _event, procard ){
            $scope._editCard = procard;
            $scope._editCard.updatedDesignationsShortnames = [];
            $scope._editCard.schoolIdx = '';
            $scope._editCard.certificationCodes = [];

            $scope.controller.Schools.get({ id: procard.contactId }, function (data) {
                $scope._schoolOptions = data;
            });

            $scope.controller.Designations.get({ id: procard.contactId }, function (data) {
                $scope._professionalDesignations = data;
                $scope._professionalDesignations.forEach( function (elm) {
                    $scope._editCard.certificationCodes.push(elm.certificationCode);
                });
            });
        });

        $scope.$watch('_editCard.certificationCodes', function(newValue, oldValue, $scope) {
            if (oldValue && newValue) {
                if (oldValue !== newValue) {
                    $scope.translateNewDesignations(newValue);
                }
            }
        });

        $scope.$watch('_editCard.schoolId', function(newValue, oldValue, $scope) {
            if (oldValue && newValue) {
                if (oldValue !== newValue) {
                    $scope.getSchoolImageForId(newValue);
                }
            }
        });

        $scope.getSchoolImageForId = function (id) {
            for (var i = 0; i < $scope._schoolOptions.length; i++) {
                if ($scope._schoolOptions[i].schoolId === id) {
                    $scope._editCard.schoolImage = $scope._schoolOptions[i].schoolImage;
                }
            }
        };

        $scope.translateNewDesignations = function (newDesignations) {
            var _possibleDesignations = $scope._professionalDesignations;
            $scope._editCard.memberProfessionalDesignations = _possibleDesignations.filter( function (element, index, array) {
                for (var i = 0; i < newDesignations.length; i++) {
                    if (element.certificationCode === newDesignations[i]) {
                        return true;
                    }
                }
            });
        };

        $scope.save = function() {
            console.log("saving");
            console.dir($scope._editCard);
            // TODO: I think we might have to parse what comes back from the form here, and then update _editCard
            $scope._editCard.update(function() {
                console.log("updated");
            });
        };
    }]);


    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', function( $scope, $rootScope, $resource, Calendar, Sessions ){
        $rootScope.pageName = 'Calendar';

        $rootScope.sidebar.incld = '_calendar-sessions.html';

        Calendar.get( { det: 'snap' }, function (data) {
            console.log('Calendar meetings:', data);
            $scope.meetings = data;
        });

        $scope.showSessions = function( meeting ){
            $rootScope.$broadcast('loadSessionsForEvent', meeting);
        };

    });


    /**
     * Calendar sessions (sidebar). Data is shared between the CalendarCtrl via the $broadcast
     * event. Could also be done as a service to share data between controllers:
     * http://stackoverflow.com/questions/9293423/can-one-controller-call-another-in-angularjs
     */
    snowPro.controller('CalendarSessionsCtrl', ['$scope', 'Sessions', function($scope, Sessions){
        $scope.meetingSessions = [];

        $scope.$on('loadSessionsForEvent', function( _event, meeting ){
            console.log('Sessions for meeting:', meeting);
            Sessions.get({id: meeting.meetingId}, function(data){
                console.log('Sessions:', data);
                $scope.meetingSessions = data;
            });
        });
    }]);


    /**
     * Contacts controller
     */
    snowPro.controller('ContactsCtrl', ['$scope', '$rootScope', 'Contacts', function( $scope, $rootScope, Contacts ){
        $rootScope.pageName = 'Contacts';

        Contacts.get({}, function(data){
            $scope.contacts = data;
        });
    }]);