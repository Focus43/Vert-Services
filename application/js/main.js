
    /**
     * VertSolutions / The Snow Pros angular app.
     */
    var snowPro = angular.module('snowPro', ['ngResource', 'vertservice']).run(['$rootScope', function( $rootScope ){
        // right sidebar includes
        $rootScope.sidebar = {incld: ''};
    }]);


    /**
     * Vertservice module; mixin to snowPro
     */
    var vertService = angular.module('vertservice', ['ngResource']).
        config(['$locationProvider', '$httpProvider', '$routeProvider', '$compileProvider', function($locationProvider, $httpProvider, $routeProvider, $compileProvider){

            // override
            $httpProvider.defaults.headers.common['Authorization'] = "VsToken MTNhNDYwNGItNDMzZS1kZTExLTk1NTUtMDA1MDU2ODM0ZGY2";

            // push state vs hash-based urls
            $locationProvider.html5Mode(true);

            // routes
            $routeProvider.when('/pro-card', {templateUrl: '_pro-card.html', controller: 'ProCardCtrl'})
                .when('/report-card', {templateUrl: '_report-card.html', controller: 'ReportCardCtrl'})
                .when('/calendar', {templateUrl: '_calendar.html', controller: 'CalendarCtrl'})
                .when('/contacts', {templateUrl: '_contacts.html', controller: 'ContactsCtrl'})
                .when('/messages', {templateUrl: '_messages.html', controller: 'MessagesCtrl'})
                .otherwise({redirectTo: '/', templateUrl: '_login.html', controller: 'LoginCtrl'});

            // white-list the tel: prefix for urls so we can auto-link phone numbers for mobile
            // https://groups.google.com/forum/#!topic/angular/YiP02I1wkNU
            $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);

        }]).
        factory('ProCard', ['$resource', function( $resource ) {

            var ProCard = $resource('http://rest.thesnowpros.org/member/procard', {}, {
                send: { method: 'POST', params:{ ProcardContactId: "@ProcardContactId", Recipient: "@Recipient", emailAddress: "@emailAddress", message: "@message"} }
            });

            ProCard.prototype.send = function (config, cb) {
                // send request to vert server
                return ProCard.send(config,
                    angular.extend({}, this, {_id:undefined}), cb);
            };

            ProCard.prototype.update = function(cb) {
                cb();
//                return ProCard.update({}, angular.extend({}, this, {_id:undefined}), cb);
            };

            return ProCard;
        }]).
        factory("Calendar", ['$resource', function ($resource) {
            return $resource('http://rest.thesnowpros.org/division/meetings');
        }]).
        factory('Contacts', ['$resource', function( $resource ){
            return $resource('http://rest.thesnowpros.org/member/contacts');
        }]).
        factory("Sessions", ['$resource', function( $resource ) {
            return $resource('http://rest.thesnowpros.org/meeting/sessions');
        }]).
        factory('MobileCarriers', ['$resource', function( $resource ){
            return $resource('http://rest.thesnowpros.org/mobilecarriers/list');
        }]).
        factory('Communications', ['$resource', function( $resource ){
            return $resource('http://rest.thesnowpros.org/member/communications');
        }]);


    /**
     * Slide-in sidebar controller
     */
    snowPro.controller('LeftSidebarCtrl', ['$scope', '$http', function( $scope, $http ){
        $http.get('http://rest.thesnowpros.org/asea/sitelinks').success(function( data ){
            $scope.links = data;
        });
    }]);

    /**
     * Login controller
     */
    snowPro.controller('LoginCtrl', ['$scope', '$rootScope', '$http', '$location', function( $scope, $rootScope, $http, $location ){
        $rootScope.pageName = 'Login';

        $scope.doLogin = function(){
            var _base64Token = Base64.encode( $scope.form_data.username + ':' + $scope.form_data.password );

            // Send token request and on success, set all future requests to include the
            // token in Authorization header
            $http.get('http://rest.thesnowpros.org/security/token', {
                headers: {'Authorization': 'Basic ' + _base64Token}
            }).success(function( _token ){
                $http.defaults.headers.common['Authorization'] = 'VsToken ' + _token;
                $location.path('/pro-card');
            }).error(function(data, status, headers, config){
                $scope.error = 'Login failed, please try again';
            });
        };

        $scope.isDisabled = function(){
            return $scope.loginForm.$invalid;
        };
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
            jQuery("#edit").show();
            jQuery("#send").hide();
            $rootScope.$broadcast('loadCardEditForm', $scope._proCard);
        };


        $scope.showSendCard = function () {
            jQuery("#edit").hide();
            jQuery("#send").show();
            $rootScope.$broadcast('loadCardSendForm', $scope._proCard);
        };

    }]);

    /**
     * Controller for editing the procard
     */
    snowPro.controller('EditProCardCtrl', ['$scope', '$resource', 'ProCard', function($scope, $resource, ProCard){

        this.Schools = $resource('http://rest.thesnowpros.org/member/schools', { }, { });
        this.Designations = $resource('http://rest.thesnowpros.org/member/professionaldesignations', { }, { });
        $scope.controller = this;

        $scope.$on('loadCardEditForm', function( _event, procard ) {

            jQuery("#edit").show();

            $scope._backupCard = jQuery.extend(true, {}, procard);
            $scope._editCard = procard;
            $scope._editCard.updatedDesignationsShortnames = [];
            $scope._editCard.schoolIdx = '';
            $scope._editCard.certificationCodes = [];

            console.log($scope);

            $scope.controller.Schools.query({ id: procard.contactId, img: true }, function (data) {
                $scope._schoolOptions = data;
            });

            $scope.controller.Designations.query({ id: procard.contactId, img: true }, function (data) {
                $scope._professionalDesignations = data;
                $scope._professionalDesignations.forEach( function (elm) {
                    $scope._editCard.certificationCodes.push(elm.certificationCode);
                });
            });
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

        $scope.restoreCard = function () {
            $scope._editCard = jQuery.extend(true, $scope._editCard, $scope._backupCard);
            // also update certification codes
            $scope._editCard.certificationCodes = $scope._editCard.memberProfessionalDesignations.map( function (obj) {
                return obj.certificationCode;
            });
        };

        $scope.save = function() {
//            $scope._editCard.update(function() {
//                $("#edit").hide();
//                angular.element( document.querySelector("#bodyWrap") ).toggleClass("show-right");
//                // TODO: implement this if not-successful update
////                $scope._editCard = $scope._backupCard;
//            });

            $scope._editCard.update(
                function success(data) {
                    console.log(data);
                    jQuery("#edit").hide();
                    angular.element( document.querySelector("#bodyWrap") ).toggleClass("show-right");
                },
                function err(data) {
                    console.log("ERROR");
                    console.log(data);
                    alert("Something went wrong, and the update didn't save.");
                    $scope._editCard = $scope._backupCard;
                });
        };
    }]);

    /**
     * Communications controller
     */
    snowPro.controller('CommunicationsCtrl', ['$scope', '$http', 'Communications', 'Contacts', 'MobileCarriers', function($scope, $http, Communications, Contacts, MobileCarriers){
        $scope.sentMessageList = Communications.query({}, function (data) {
            return data;
        });

        $scope.$on('loadCardSendForm', function( _event, procard ) {
            $scope._sendCard = procard;

            Contacts.query({img: true}, function(data){
                $scope._contacts = data;
            });

            MobileCarriers.query({}, function(data){
                $scope._carrierOptions = data;
            });
        });

        $scope.toggleForms = function (evt) {
            var _hideContainer = jQuery(evt.target).parent();
            var _showContainer = _hideContainer.siblings(".hide-it");

            _hideContainer.toggleClass("hide-it");
            _showContainer.toggleClass("hide-it");
        };

        $scope.sendCardId = function (ProcardContactId) {

            var _contact = $scope._contacts.filter( function (elm) {
                return elm.id === ProcardContactId;
            });

            var _recipient =  _contact[0].name.replace(" ", "_");
            var _contactInfo = {
                ProcardContactId: ProcardContactId,
                emailAddress: _contact[0].emailAddress,
                Recipient: _recipient
            };

            // Send update
            $http({
                method: 'POST',
                url: 'http://rest.thesnowpros.org/member/communications',
                params: _contactInfo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function(){
                alert('Pro Card Sent!');
                angular.element( document.querySelector("#bodyWrap") ).removeClass("show-right");
            });
        };

        $scope.sendCardManual = function ( _contactInfo ) {
            // Send update
            $http({
                method: 'POST',
                url: 'http://rest.thesnowpros.org/member/communications',
                params: _contactInfo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function(){
                alert('Pro Card Sent!');
                angular.element( document.querySelector("#bodyWrap") ).removeClass("show-right");
            });
        };
    }]);

    /**
     * Messages controller
     */
    snowPro.controller('MessagesCtrl', ['$scope', '$rootScope', 'Communications', function($scope, $rootScope, Communications){

        $rootScope.sidebar.incld = '_message-detail.html';

        Communications.query({}, function (data) {
            $scope.sentMessageList =  data;
        });

        $scope.dateSent = '-1';
        $scope.ShowHeader = function( dateString ){
            var _showHeader = (dateString !== $scope.dateSent);
            $scope.dateSent = dateString;
            return _showHeader;
        };

        $scope.showMessage = function( message ){
            $rootScope.$broadcast('loadMessage', message);
        };

    }]);

    /**
     * Message Detail controller
     */
    snowPro.controller('MessageDetailCtrl', ['$scope', '$rootScope', 'Communications', function($scope, $rootScope, Communications){

        $scope.$on('loadMessage', function( _event, message ){
            $scope.message = message;
        });

        // same way we group and sort dates in the CalendarCtrl
        // used for the calendar view ngrepeat to output list headers
        // http://stackoverflow.com/questions/15577791/angular-ng-repeat-with-header-views
        $scope.dateSent = '-1';
        $scope.ShowHeader = function( dateString ){
            var _showHeader = (dateString !== $scope.dateSent);
            $scope.dateSent = dateString;
            return _showHeader;
        };
    }]);


    /**
     * Calendar controller
     */
    snowPro.controller('CalendarCtrl', ['$scope', '$rootScope', 'Calendar', function( $scope, $rootScope, Calendar ){
        $rootScope.pageName = 'Calendar';

        $rootScope.sidebar.incld = '_calendar-sessions.html';

        Calendar.query({det: 'snap'}, function( data ){
            $scope.meetings = data;
        });

        $scope.showSessions = function( meeting ){
            $rootScope.$broadcast('loadSessionsForEvent', meeting);
        };

        // used for the calendar view ngrepeat to output list headers
        // http://stackoverflow.com/questions/15577791/angular-ng-repeat-with-header-views
        $scope.currentMeetingDate = '-1';
        $scope.ShowDateHeader = function( dateString ){
            var _showHeader = (dateString !== $scope.meetingStartDate);
            $scope.meetingStartDate = dateString;
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
            Sessions.query({id: meeting.meetingId}, function( data ){
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
    snowPro.controller('ContactsCtrl', ['$scope', '$rootScope', '$http', 'Contacts', function( $scope, $rootScope, $http, Contacts){
        $rootScope.pageName = 'Contacts';

        Contacts.query({}, function(data){
            $scope.contacts = data;
        });

        $scope.sendCard = function (ProcardContactId) {

            var _contact = $scope.contacts.filter( function (elm) {
                return elm.id === ProcardContactId;
            });

            var _contactInfo = {
                ProcardContactId: ProcardContactId,
                emailAddress: _contact[0].emailAddress,
                Recipient: _contact[0].name
            };

            // Send update
            $http({
                method: 'POST',
                url: 'http://rest.thesnowpros.org/member/communications',
                params: _contactInfo,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            });


        };
    }]);

