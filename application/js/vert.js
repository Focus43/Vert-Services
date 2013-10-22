var ProCardApp = {

//    securitytoken: null,
    securitytoken: 'ew0KICAidHlwIjogIkpXRSIsDQogICJhbGciOiAiUlNBLU9BRVAiLA0KICAiZW5jIjogIkEyNTZHQ00iLA0KICAiY3R5IjogIkpXUyINCn0.kSwTI_qnPYkOATSl_kxT14nisgi0QkxpjbxdL0fwhlzBFWqCQkAUNJFWEWysYvrxmcGkL9LzxTc8Lym4Sn9hnvfVuLzmkWqBrcjI9dd6LMQPQUNOBqVH_ZElMcbeqS3L6nfR9MYkB_pN4Y3SOu-C5znNJrhgQ1Y-Au4oHeT0gNBZyqrRj_R3SAbMWqSQ5NmuJOza_H7c93ohXFI2A-Z9db02S_HtvI_ELwKj-iTuSgy80BeNwpFglg_tNc3d7qoyAtJRjsKfE6PlMlh3DKHkwK58RxBqBXZaqbLYI65OdrmBUW4eq5RqYGyfHWy-vl6LDEaT_H5NbQZ3XgIYdvsmS4_sa0OKITrvmfhg155qA0YRHO_trin9gPdKV2ciR0FpMPlbrjbLMb7eBoy50dvtk_hLgTIwzudBjWofywpUID4SlW_h3eglcskjBWccQ_sT36m2qEY-ag563u9zjq3zFkDiUt0s7WLetRiGLifwevGv5g3vcTFM21e1QcFjPnvt5SBmGvJy3tMyzJ_7KnmlLfOq-BpLmseSAYin1jBoEDzdssbS5PQxp-yafzGyPHeyjW4HeMWRhHWX4sJy7m_y9Kac7DJLZROLtEjlWei-NkUkFCngBoAwQG0rbQs9MDeahLB7WC5jrBVmhWbT8SsYevermr7TwKn5taD8ggbLYC1E2FuLY_ngcow1PeY7tlgM0C-TZu1Rn6nvcpw4YQXJc0Z5LdvLrFa7g92EsgyxMAbPqI-EpHzXrivVDmuMwwQZpNvakRS9_nBrVchfDJ-au4hEwu5gtMGwSB60vHJolgRxsDGBfJADDLnDhLtEWCE2CZ2vVgHyFS_k50gwOlmCjZQGd7keMMKIIr0G56XTkg_WkzSHg1TEXzLEs4UFa6QfJFVehAzEQsolgFc8260GEFo0Jra656vKZQ-2fI_HJiusWT7Qfiv679Xj79T6WrV6847RS3CEghbDlpfxjECGCIS7mmSHSXhznapkEX0KdW1b6NvYtb1onF21g4Bl9dmf.P6HyGdyEqFy6vSnq.gKQuKbucv4cklrrLs72-M2NqTOdwVqVX3hDM5ek0oredECLIUT49ON8v5vzxgx1F3KcPg8_BBC_FueEzIaK4pgIwKCyqnKcR5AAHgXNUgouOPTUxIDIifm8_C3GTcaaKgD9e3hx_HEH2QhVfXvenwxUTd2tcLMyNSybsy30OXY4V4QmBkgBr6qEGCCuiTREeinL6HLAgqvtMPNzT3j7B2jZhfIbsMOLs2larTz1RRgfewEBugUeIXR82-3qChvBz2w3jtWwfATMmytJ66QANo3IVUB-xblOeZzVWMZ0UR04G8uPy8lqDkqabrckBhmNnwuupzb4k0iiEq9ss_PhAY1UR41cwHOYOm-PBr9hOfyqeS-eU94CKuI9n_DJnMB9J_IW0E41nbasLUNW58fSu8FYChGXRIwBovG0Sp9CIM0YVdBl4ap9fQC7OOW_1WYmUBLhYafd10OQYWxVuhAGULKyk_aTuWZcN9OXSq5BYkxGGrCegDNdEJBF6fzVrXKeXlU8UNXGpTwrrURDsLAHIG0-v1iA1ex90GfK0MxWdGGg6na3hJjETYBlshPEYGxqm9wRTwxpYp7Z8TnjmtMEjCvowpanVcSTAI0tqaWxbYNF3naHEXy-6aglChcJSbDAjZOW5RcbbfCOIt2NrokAm7sdl2oEWXhZguYqmMdLmxnQAGsLSwg-L1mVxuRhX2QtK7TXi39lqYTNFLYB8ST64_SQZ8guGungE6BJg3RKI_82ph_ChKNMjpFKk20ISRbtZvfEQXbF6AJQJuDuLNKpOyfVWJdD6NI9acYz33L2Tw_8CSPNwvAl7Xye4D-qApayotnTeW9BERSfbMEVsnR5EhiIy_kAxeHD1Z3LCOa8Djaa9bdYDboFHjIy7V1eaDQawtlXFtOk4gW5JDCJ9P_mnGw8OUnTrTl8tksezZpqGDeof98GBY0fwpifwGhbDQ3CS9uTRf4iLiOEZJdYa6pOaToN8UnAcQjSBicUS7-kyw63eDjroUt2Q5tcKTT4yqVVaECGF8C_LZ-iX5aI3PmtYt1GKjqylkH1OMufmEZEBgfomwj6_-Bs96mRhKUuxn7kSkXRYFLXaxuz9_f3U24BJEOlCKNFozRva5wXiNbY0YsSIsDIJFXPQ0D23LFUoIO74zjbFDO9aQ1uyzNVh__zeZtdnCiWu88IK_JfUBO67F-2XxK7rTvcLB55XOiFsLyywpLPDpCpSTHIhaZZtfpsiNbPQmuoL57VD5f5RUcFc7AtkhvMfpff6eXUuZuxsjPt49UXxCvyFZDqyytkdXKgpwKqTYqBvq4g9HR9WpyIGyq-lhlLvgceIobtX1R58qVtqWIjaMrIveXOu2hjcn8S3L5picFGOidJHhcv632AdDiQ_HYFXxt7FJG5nlbAL4ktMQUKKPs8qTrFas7ptGP1_nVDHOqVnSq9Q0zF2ppwPkYw1yAwLerOkI5qhqKANwlvMUb8C4Wyz5qJojBtU2v2GMbKyrx-B3DAO2eVG-s-9a2TEf5EmLY5h8x5l5MbAIvR16Ns3nqqfHdRbMMrfHC2VPcbW1dBwkQTnhX0jYB4rjW8m799_YwzerzUO0W04ZKb3CJY-DsCBhZX_0niSlQvgjt28a0oqxU2I48iuFIRZyu-WcKIY6ncSay_wpgKzgAxLNAnAO6XZMHfkXwALgkLxJYwyFtsuzn8AiQTnqpXQdyHJt1mKf1UglseDV_WrlQJuodDBH21vg3Xf_xWV6hqCF7DI33AarVEXa9RPjfYRi6FcUcXsICdcYuobYAJ_LhpGmyW3XqFKQE8uVtqfG5lKo3fX_mTybqIsaNP_3YB96_pGO40g3JfTmIFBzeUOEg4aN-upfy5StMhUx93wFsGj5JQmv3UBpIjYuOPO-6HGiuGO_K-SmgmImUNuhzj9xe2-zVfae3yAaQhOBi-85v5IZCA3c6vUC6V1l04dB6MOh5rmNCkBnRKe5MJGwpD5n-RyvNWT_pvZ0KHQ_1ph19X_Jm8HFA3EUGFP-Ecxl0lDSoUWNm5d6DvcEKTWFjtiisWqsLLen8tYVZ9CfQ-uOD79xCN0Ad02dUg8XeTVxm6uG_V7m8TCpg-SG_6NWZ7eh5YQClhIGnsjoYNHFCUq1VhV2dIAxf3XT4ILS25xSs2w3kD8tASWE20CRZ0gHcypNPd65uxMvVc3sWA1kXgKJKt1L9AruC5qMyp2fYQ3_E6GPY5jgCVBwusn-2Z2mUIZ2zs-PG1zTSNzXXJTP3KAOHpYV0nVKLslf8lpc30vVWWE_QSthVlKrX49vdEWCZ7PsbUr0-8CGKGEE_CrjFn6VXM4_oLB9fQnHUz0ZSMFp62n_YpJN3W1TBos5AqWBrWrjrNE195PuE4BUDD1WUEKJt5vctnDpqHrzm2wWMoQ0nyivzIg2EmZAOV8jABoi0cugDBCBh5gB36P-OffqaVgj7m3as_9qu1XDtICRWkdhbBq1U9Ho67god3YtPG2APX4WQ88QQzl3oyDOev4HI0VYbV8C-spQL06iIBzg4ExVerR9-v45cVII8NL8Vuae-3r__2vIPcwrDhCM3LwqoFhuMRAAkqmYvXlxIrCWJeI9ZMw5tsZWK9pFBn8_0qKqcVFWuz61_kj-l9RwWYEjTT73Y8jhECHFiukpOO6JplgYj3GEX4PmLnz2RguX5gBoq7u8g2w.D5i589kYLl-YAaKu7vINsA',
//    currentUserId: "",
    currentUserId: "13A4604B-433E-DE11-9555-005056834DF6",
    currentUserDivision: "Eastern",

    init: function () {
        $("form#login").submit( function ( evt ) {
            evt.preventDefault();
            ProCardApp.login(evt.target);
        });

        $("div.edit-off-buttons .btn.edit").click( function ( evt ) {
            $("div.edit-off-buttons").hide();
            $("div.edit-on-buttons").show();
        });

        $("div.edit-off-buttons .btn.share").click( function ( evt ) {
            $("div.contact-list").show();
        });

        $("div.edit-on-buttons").click( function ( evt ) {
            evt.preventDefault();
            $("div.edit-on-buttons").hide();
            $("div.edit-off-buttons").show();
        });

//        $.ajax({
//            crossDomain: true,
//            dataType: 'jsonp',
//            url: "http://rest.thesnowpros.org/member/profile?ctyp=json&mnum=",
////            headers: { 'Authorization': 'Basic ' + Base64.encode(authStr), 'Referer': 'http://cst.thesnowpros.org' },
////            beforeSend: function (xhr){
////                xhr.setRequestHeader('Authorization', ProCard.securitytoken);
////            },
//            success: function (data) {
//                console.log("success");
//                console.log(data);
//            },
//            error: function (data, errCode, errStr) {
//                console.log("error #" +errCode);
//                console.log(errStr);
//            }
//        });
    },

    login: function ( form ) {
        var uname = $(form).children("input")[0].value;
        var pwd = $(form).children("input")[1].value;
        var authStr = uname + ":" + pwd;

        $.ajax({
            url: "https://vista.vertonline.net/token",
//            headers: { 'Authorization': 'Basic ' + Base64.encode(authStr), 'Referer': 'http://cst.thesnowpros.org' },
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', 'Basic ' + Base64.encode(authStr));
                xhr.setRequestHeader('X-Alt-Referer', 'http://cst.thesnowpros.org' );
            },
            success: function (data) {
                console.log("success");
                console.log(data);
                ProCardApp.securitytoken = data.token;
                ProCardApp.currentUserId = data.id;
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        });
    }
};

angular.module('vertservice', ['ngResource']).
    config(function($httpProvider){
//        $httpProvider.defaults.headers.common['Authorization'] = ProCard.securitytoken;   // replace with token
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }).
    factory('ProCard', function($resource) {

        var ProCard = $resource('http://rest.thesnowpros.org/member/:verb', { verb: '@verb', callback: 'JSON_CALLBACK'}, {
            get: { method: 'JSONP' },   // TODO: put userId param up here?
            send: { method: 'POST' }
        });

        ProCard.prototype.send = function (config, cb) {
            console.log("send it!");
            // send request to vert server
            return ProCard.send(config,
                angular.extend({}, this, {_id:undefined}), cb);
        };

        ProCard.prototype.update = function(cb) {
            return ProCard.update({personId: this.personId},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        return ProCard;
    })
    .factory('Contact', function($resource) {

        var Contact = $resource("http://rest.thesnowpros.org/contact/profile?id=:personId", { personId:'@id' });

        return Contact;
    })
    .factory("Calendar", function ($resource) {

        var Calendar = $resource('http://rest.thesnowpros.org/division/meetings', { callback: 'JSON_CALLBACK' }, {
            get: {method: 'JSONP'}
        });

        return Calendar;
    });



function ProCardController ($scope, ProCard) {

    ProCard.get({ verb:'procard', memnum:ProCardApp.currentUserId }, function( data ) {
        $scope.procard = data;
    });

    $scope.contacts =  [{'name': 'Nexus S', 'email': 'email@email.com', 'mobilePhone': '123 456 7890', 'id': '1234'},
                        {'name': 'Motorola XOOM', 'email': 'email@email.com', 'mobilePhone': '123 456 7890', 'id': '1234'} ];

    $scope.fullNameDisplay = function (firstName, middlename, lastName) {
        var _nameStr = "" ;
        if (firstName) {
            _nameStr += firstName;
        }
        if (middlename) {
            _nameStr += " " + middlename;
        }
        if (lastName) {
            _nameStr += " " + lastName;
        }
        return _nameStr;
    };

    $scope.nickNameDisplay = function (nickName) {
        if (nickName) {
            return "AKA " + nickName;
        }
    };

    $scope.save = function (card) {
        var procard = new ProCard(card);
        procard.$save();
    };

    $scope.send = function (card, $event) {
        var _target = $($event.target);
        var contactId = _target.siblings(".id").attr("data-contactId");
        var procard = new ProCard(card);

        // TODO: remove this when send is linked up, since hide should happen on success
        $("div.contact-list").hide();

        procard.send( { verb:'communications', memnum: ProCardApp.currentUserId, id: contactId }, function () {
            $("div.contact-list").hide();
            confirm("Your card was sent to " + contactId);
        });
    };
}

function ContactListController ($scope, Contact) {

    $scope.contacts =  [{'firstName': 'Nexus S', 'lastName': 'Fast just got faster'},
        {'firstName': 'Motorola XOOM', 'lastName': 'The next, next generation tablet'} ];
    // TODO: uncomment this, to get the correct data
//    $scope.contacts = Contact.query();
    $scope.contact =  Contact.get();

}

function CalendarController ($scope, Calendar) {

    Calendar.get( function (data) {
        console.log(data);
        $scope.events = data;
    });
}

angular.module ('procard', ['vertservice']).
    config( function($routeProvider, $locationProvider) {
        // TODO: remove random number to get caching back
        $routeProvider.
//            when('/myprocard/:personId', { controller:MemberController, templateUrl:'/memberCard.html?' + Math.random()*1000  }).
//            when('/sendmyprocard/:personId', { controller:MemberController, templateUrl:'/sendCard.html?' + Math.random()*1000 }).
//            when('/myinfo/:personId', { controller:MemberController, templateUrl:'/memberInfo.html?' + Math.random()*1000  }).
            when('/calendar', { controller:CalendarController, templateUrl:'/calendar.html?' + Math.random()*1000  }).
//            when('/edit/:tripId', { controller:EditController, templateUrl:'/tripDetail.html?' + Math.random()*1000 }).
//            when('/new', { controller:CreateCtrl, templateUrl:'/tripDetail.html?' + Math.random()*1000 }).
            otherwise({ redirectTo:'/' });

//        $locationProvider.html5Mode(true);
    });


ProCardApp.init();


//factory('Member', function($resource) {
//
//    var Member = $resource("http://rest.thesnowpros.org/member/profile?ctyp=json&mnum=:personId", { personId:'@id' });
//    // TODO: add sendCard action (if it uses similar url
//
//    Member.prototype.update = function(cb) {
//        return Member.update({personId: this.personId},
//            angular.extend({}, this, {_id:undefined}), cb);
//    };
//
//    Member.prototype.destroy = function(cb) {
//        return Member.remove({personId: this.personId}, cb);
//    };
//
//    return Member;
//}).

//function MemberController ($scope, Member) {
//
//    // TODO: this currently just gets the map for member info
//    // Need to come up with a getAll type method in the Member factory to use here
//    $scope.members = Member.query();
//
//    Member.get({personId:ProCardApp.currentUserId}, function( data ) {
//        $scope.member = data.result;
//    });
//
//    $scope.save = function (mem) {
//        var member = new Member(mem);
//        member.$save();
//    };
//
//    $scope.preferedResortAssosciation = function (member) {
//        return member.resorts[0];
//    };
//
//}
