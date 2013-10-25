
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
    snowPro.run(['$rootScope', function( $rootScope ){
        // hardcoded for now...
        $rootScope.userID = '13a4604b-433e-de11-9555-005056834df6';

        // right sidebar includes
        $rootScope.sidebar = {
            incld: ''
        };
    }]);

    var vertService = angular.module('vertservice', ['ngResource']).
        config(['$locationProvider', '$httpProvider', '$routeProvider', '$compileProvider', function($locationProvider, $httpProvider, $routeProvider, $compileProvider){

            $httpProvider.defaults.headers.common['Authorization'] = "NzlmYTNjZDAtNDAzZS1kZTExLTk1NTUtMDA1MDU2ODM0ZGY2";   // replace with token
            delete $httpProvider.defaults.headers.common["X-Requested-With"];

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
                cb();
//                return ProCard.update({memnum: this.contactId},
//                    angular.extend({}, this, {_id:undefined}), cb);
            };

            return ProCard;
        }]).
        factory("Calendar", ['$resource', '$rootScope', function ($resource, $rootScope) {
            var Calendar = $resource('http://rest.thesnowpros.org/division/meetings', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { memnum:$rootScope.userID } }
            });
            //var Calendar = $resource('http://10.0.5.130\\:8080/ajax_mocks/meetings.json', { callback: 'JSON_CALLBACK' }, {
            //    get: { method: 'JSONP', isArray: true, params: { memnum:$rootScope.userID } }
            //});

            return Calendar;
        }]).
        factory('Contacts', ['$resource', function( $resource ){
            var ContactList = $resource('http://rest.thesnowpros.org/member/contacts', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true }
            });

            return ContactList;
        }]).
        factory("Sessions", ['$resource', function( $resource ) {
            var Sessions = $resource('http://rest.thesnowpros.org/meeting/sessions', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true, params: { id: "@id" } }
            });

            return Sessions;
        }]).
        factory('Communications', ['$resource', function( $resource ){
            var Communications = $resource('http://rest.thesnowpros.org/member/communications', { callback: 'JSON_CALLBACK' }, {
                get: { method: 'JSONP', isArray: true },
                send: { method: 'POST'}
            });

            return Communications;
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
            $("#edit").show();
            $("#send").hide();
            $rootScope.$broadcast('loadCardEditForm', $scope._proCard);
        };


        $scope.showSendCard = function () {
            $("#edit").hide();
            $("#send").show();
            $rootScope.$broadcast('loadCardSendForm', $scope._proCard);
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

        $scope.$on('loadCardEditForm', function( _event, procard ) {

            $("#edit").show();

            $scope._backupCard = jQuery.extend(true, {}, procard);
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
            $scope._editCard.update(function() {
                console.log("updated");
                $("#edit").hide();
                angular.element( document.querySelector("#bodyWrap") ).toggleClass("show-right");
                // TODO: implement this if not-successful update
//                $scope._editCard = $scope._backupCard;
            });
        };
    }]);

    /**
     * Communications controller
     */
    snowPro.controller('CommunicationsCtrl', ['$scope', '$resource', 'ProCard', 'Communications', function($scope, $resource, ProCard, Communications){

        this.Contacts = $resource('http://rest.thesnowpros.org/member/contacts', { callback: 'JSON_CALLBACK' }, {
            get: { method: 'JSONP', isArray: true, params: { id: "@id", img: true } }
        });

        this.Carriers = $resource('http://rest.thesnowpros.org/mobilecarriers/list', { callback: 'JSON_CALLBACK' }, {
            get: { method: 'JSONP', isArray: true }
        });

        $scope.sendController = this;

        $scope.$on('loadCardSendForm', function( _event, procard ) {

            $scope._sendCard = procard;

            $scope.sendController.Contacts.get({ id: procard.contactId }, function (data) {
                $scope._contacts = data;
            });

            $scope.sendController.Carriers.get({  }, function (data) {
                $scope._carrierOptions = data;
                $scope._communication.mobileCarrierId = 1; // set default
            });

        });

        $scope.toggleForms = function (evt) {
            var _hideContainer = $(evt.target).parent();
            var _showContainer = _hideContainer.siblings(".hide-it");

            _hideContainer.toggleClass("hide-it");
            _showContainer.toggleClass("hide-it");
        };

        $scope.sendCard = function (ProcardContactId) {
            console.log($scope._sendCard);
            console.log($scope._communication);
            Communications.send({ id: ProcardContactId }, function (data) {
                console.log(data);
            });
        };


    }]);


    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', ['$scope', '$rootScope', 'Calendar', function( $scope, $rootScope, Calendar ){
        $rootScope.pageName = 'Calendar';

        $rootScope.sidebar.incld = '_calendar-sessions.html';

        Calendar.get( { det: 'snap' }, function (data) {
            console.log('Calendar meetings:', data);
            $scope.meetings = data;
        });

        $scope.showSessions = function( meeting ){
            $rootScope.$broadcast('loadSessionsForEvent', meeting);
        };

        // used for the calendar view ngrepeat to output list headers
        // http://stackoverflow.com/questions/15577791/angular-ng-repeat-with-header-views
        $scope.currentMeetingDate = '-1';
        $scope.ShowDateHeader = function( dateString ){
            var _showHeader = (dateString !== $scope.currentMeetingDate);
            $scope.currentMeetingDate = dateString;
            return _showHeader;
        };

    }]);


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

        // same way we group and sort dates in the CalendarCtrl
        // used for the calendar view ngrepeat to output list headers
        // http://stackoverflow.com/questions/15577791/angular-ng-repeat-with-header-views
        $scope.currentMeetingDate = '-1';
        $scope.ShowDateHeader = function( dateString ){
            var _showHeader = (dateString !== $scope.currentMeetingDate);
            $scope.currentMeetingDate = dateString;
            return _showHeader;
        };
    }]);


    /**
     * Contacts controller
     */
    snowPro.controller('ContactsCtrl', ['$scope', '$rootScope', 'Contacts', 'Communications', function( $scope, $rootScope, Contacts, Communications ){
        $rootScope.pageName = 'Contacts';

        Contacts.get({}, function(data){
            $scope.contacts = data;
        });

        $scope.sendCard = function (ProcardContactId) {
            console.log(ProcardContactId);
            Communications.send({ id: ProcardContactId }, function (data) {
                console.log(data);
            });
        };
    }]);

