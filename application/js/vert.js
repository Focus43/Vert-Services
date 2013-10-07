var ProCard = {

//    securitytoken: null,
    securitytoken: 'ew0KICAidHlwIjogIkpXRSIsDQogICJhbGciOiAiUlNBLU9BRVAiLA0KICAiZW5jIjogIkEyNTZHQ00iLA0KICAiY3R5IjogIkpXUyINCn0.kSwTI_qnPYkOATSl_kxT14nisgi0QkxpjbxdL0fwhlzBFWqCQkAUNJFWEWysYvrxmcGkL9LzxTc8Lym4Sn9hnvfVuLzmkWqBrcjI9dd6LMQPQUNOBqVH_ZElMcbeqS3L6nfR9MYkB_pN4Y3SOu-C5znNJrhgQ1Y-Au4oHeT0gNBZyqrRj_R3SAbMWqSQ5NmuJOza_H7c93ohXFI2A-Z9db02S_HtvI_ELwKj-iTuSgy80BeNwpFglg_tNc3d7qoyAtJRjsKfE6PlMlh3DKHkwK58RxBqBXZaqbLYI65OdrmBUW4eq5RqYGyfHWy-vl6LDEaT_H5NbQZ3XgIYdvsmS4_sa0OKITrvmfhg155qA0YRHO_trin9gPdKV2ciR0FpMPlbrjbLMb7eBoy50dvtk_hLgTIwzudBjWofywpUID4SlW_h3eglcskjBWccQ_sT36m2qEY-ag563u9zjq3zFkDiUt0s7WLetRiGLifwevGv5g3vcTFM21e1QcFjPnvt5SBmGvJy3tMyzJ_7KnmlLfOq-BpLmseSAYin1jBoEDzdssbS5PQxp-yafzGyPHeyjW4HeMWRhHWX4sJy7m_y9Kac7DJLZROLtEjlWei-NkUkFCngBoAwQG0rbQs9MDeahLB7WC5jrBVmhWbT8SsYevermr7TwKn5taD8ggbLYC1E2FuLY_ngcow1PeY7tlgM0C-TZu1Rn6nvcpw4YQXJc0Z5LdvLrFa7g92EsgyxMAbPqI-EpHzXrivVDmuMwwQZpNvakRS9_nBrVchfDJ-au4hEwu5gtMGwSB60vHJolgRxsDGBfJADDLnDhLtEWCE2CZ2vVgHyFS_k50gwOlmCjZQGd7keMMKIIr0G56XTkg_WkzSHg1TEXzLEs4UFa6QfJFVehAzEQsolgFc8260GEFo0Jra656vKZQ-2fI_HJiusWT7Qfiv679Xj79T6WrV6847RS3CEghbDlpfxjECGCIS7mmSHSXhznapkEX0KdW1b6NvYtb1onF21g4Bl9dmf.P6HyGdyEqFy6vSnq.gKQuKbucv4cklrrLs72-M2NqTOdwVqVX3hDM5ek0oredECLIUT49ON8v5vzxgx1F3KcPg8_BBC_FueEzIaK4pgIwKCyqnKcR5AAHgXNUgouOPTUxIDIifm8_C3GTcaaKgD9e3hx_HEH2QhVfXvenwxUTd2tcLMyNSybsy30OXY4V4QmBkgBr6qEGCCuiTREeinL6HLAgqvtMPNzT3j7B2jZhfIbsMOLs2larTz1RRgfewEBugUeIXR82-3qChvBz2w3jtWwfATMmytJ66QANo3IVUB-xblOeZzVWMZ0UR04G8uPy8lqDkqabrckBhmNnwuupzb4k0iiEq9ss_PhAY1UR41cwHOYOm-PBr9hOfyqeS-eU94CKuI9n_DJnMB9J_IW0E41nbasLUNW58fSu8FYChGXRIwBovG0Sp9CIM0YVdBl4ap9fQC7OOW_1WYmUBLhYafd10OQYWxVuhAGULKyk_aTuWZcN9OXSq5BYkxGGrCegDNdEJBF6fzVrXKeXlU8UNXGpTwrrURDsLAHIG0-v1iA1ex90GfK0MxWdGGg6na3hJjETYBlshPEYGxqm9wRTwxpYp7Z8TnjmtMEjCvowpanVcSTAI0tqaWxbYNF3naHEXy-6aglChcJSbDAjZOW5RcbbfCOIt2NrokAm7sdl2oEWXhZguYqmMdLmxnQAGsLSwg-L1mVxuRhX2QtK7TXi39lqYTNFLYB8ST64_SQZ8guGungE6BJg3RKI_82ph_ChKNMjpFKk20ISRbtZvfEQXbF6AJQJuDuLNKpOyfVWJdD6NI9acYz33L2Tw_8CSPNwvAl7Xye4D-qApayotnTeW9BERSfbMEVsnR5EhiIy_kAxeHD1Z3LCOa8Djaa9bdYDboFHjIy7V1eaDQawtlXFtOk4gW5JDCJ9P_mnGw8OUnTrTl8tksezZpqGDeof98GBY0fwpifwGhbDQ3CS9uTRf4iLiOEZJdYa6pOaToN8UnAcQjSBicUS7-kyw63eDjroUt2Q5tcKTT4yqVVaECGF8C_LZ-iX5aI3PmtYt1GKjqylkH1OMufmEZEBgfomwj6_-Bs96mRhKUuxn7kSkXRYFLXaxuz9_f3U24BJEOlCKNFozRva5wXiNbY0YsSIsDIJFXPQ0D23LFUoIO74zjbFDO9aQ1uyzNVh__zeZtdnCiWu88IK_JfUBO67F-2XxK7rTvcLB55XOiFsLyywpLPDpCpSTHIhaZZtfpsiNbPQmuoL57VD5f5RUcFc7AtkhvMfpff6eXUuZuxsjPt49UXxCvyFZDqyytkdXKgpwKqTYqBvq4g9HR9WpyIGyq-lhlLvgceIobtX1R58qVtqWIjaMrIveXOu2hjcn8S3L5picFGOidJHhcv632AdDiQ_HYFXxt7FJG5nlbAL4ktMQUKKPs8qTrFas7ptGP1_nVDHOqVnSq9Q0zF2ppwPkYw1yAwLerOkI5qhqKANwlvMUb8C4Wyz5qJojBtU2v2GMbKyrx-B3DAO2eVG-s-9a2TEf5EmLY5h8x5l5MbAIvR16Ns3nqqfHdRbMMrfHC2VPcbW1dBwkQTnhX0jYB4rjW8m799_YwzerzUO0W04ZKb3CJY-DsCBhZX_0niSlQvgjt28a0oqxU2I48iuFIRZyu-WcKIY6ncSay_wpgKzgAxLNAnAO6XZMHfkXwALgkLxJYwyFtsuzn8AiQTnqpXQdyHJt1mKf1UglseDV_WrlQJuodDBH21vg3Xf_xWV6hqCF7DI33AarVEXa9RPjfYRi6FcUcXsICdcYuobYAJ_LhpGmyW3XqFKQE8uVtqfG5lKo3fX_mTybqIsaNP_3YB96_pGO40g3JfTmIFBzeUOEg4aN-upfy5StMhUx93wFsGj5JQmv3UBpIjYuOPO-6HGiuGO_K-SmgmImUNuhzj9xe2-zVfae3yAaQhOBi-85v5IZCA3c6vUC6V1l04dB6MOh5rmNCkBnRKe5MJGwpD5n-RyvNWT_pvZ0KHQ_1ph19X_Jm8HFA3EUGFP-Ecxl0lDSoUWNm5d6DvcEKTWFjtiisWqsLLen8tYVZ9CfQ-uOD79xCN0Ad02dUg8XeTVxm6uG_V7m8TCpg-SG_6NWZ7eh5YQClhIGnsjoYNHFCUq1VhV2dIAxf3XT4ILS25xSs2w3kD8tASWE20CRZ0gHcypNPd65uxMvVc3sWA1kXgKJKt1L9AruC5qMyp2fYQ3_E6GPY5jgCVBwusn-2Z2mUIZ2zs-PG1zTSNzXXJTP3KAOHpYV0nVKLslf8lpc30vVWWE_QSthVlKrX49vdEWCZ7PsbUr0-8CGKGEE_CrjFn6VXM4_oLB9fQnHUz0ZSMFp62n_YpJN3W1TBos5AqWBrWrjrNE195PuE4BUDD1WUEKJt5vctnDpqHrzm2wWMoQ0nyivzIg2EmZAOV8jABoi0cugDBCBh5gB36P-OffqaVgj7m3as_9qu1XDtICRWkdhbBq1U9Ho67god3YtPG2APX4WQ88QQzl3oyDOev4HI0VYbV8C-spQL06iIBzg4ExVerR9-v45cVII8NL8Vuae-3r__2vIPcwrDhCM3LwqoFhuMRAAkqmYvXlxIrCWJeI9ZMw5tsZWK9pFBn8_0qKqcVFWuz61_kj-l9RwWYEjTT73Y8jhECHFiukpOO6JplgYj3GEX4PmLnz2RguX5gBoq7u8g2w.D5i589kYLl-YAaKu7vINsA',
    currentUserId: null,

    init: function () {
        $("form#login").submit( function ( evt ) {
            evt.preventDefault();
            ProCard.login(evt.target);
        });



//        $.ajax({
//            crossDomain: true,
//            dataType: 'jsonp',
//            jsonp: function (data) {
//                console.log("JSONP! \n" + data);
//            },
//            url: "http://rest.thesnowpros.org/member/profile.ashx?ctyp=json",
////            headers: { 'Authorization': 'Basic ' + Base64.encode(authStr), 'Referer': 'http://cst.thesnowpros.org' },
//            beforeSend: function (xhr){
//                xhr.setRequestHeader('Authorization', ProCard.securitytoken);
//            },
//            success: function (data) {
//                console.log("success");
//                console.log(data);
//            },
//            error: function (data) {
//                console.log("error");
//                console.log(data);
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
                ProCard.securitytoken = data.token;
                ProCard.currentUserId = data.id;
            },
            error: function (data) {
                console.log("error");
                console.log(data);
            }
        }) ;
//            .done(function (data) {
//                ProCard.securitytoken = data.token;
//                ProCard.currentUserId = data.id;
//                // show next page  or error message
//            });
    }

};


function PhoneListCtrl($scope){
    $scope.phones = [
        {'name': 'Nexus S', 'snippet': 'Fast just got faster'},
        {'name': 'Motorola XOOM', 'snippet': 'The next, next generation tablet'}
    ];
}

angular.module('vertservice', ['ngResource']).
    config(function($httpProvider){
        $httpProvider.defaults.headers.common['Authorization'] = ProCard.securitytoken;   // replace with token
    }).
    factory('Member', function($resource) {

        var Member = $resource("http://rest.thesnowpros.org/member/profile.ashx?ctyp=json&id=:personId", { personId:'@id' });
        // TODO: add sendCard action (if it uses similar url

        Member.prototype.sendProcard = function (contactId, cb) {
            return Member.sendCard({personId: this.personId, contactId: contactId },
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Member.prototype.update = function(cb) {
            return Member.update({personId: this.personId},
                angular.extend({}, this, {_id:undefined}), cb);
        };

        Member.prototype.destroy = function(cb) {
            return Member.remove({personId: this.personId}, cb);
        };

        return Member;
    })
    .factory('Contact', function($resource) {

        var Contact = $resource("http://rest.thesnowpros.org/contact/profile.ashx?id=:personId", { personId:'@id' });

//        Contact.prototype.update = function(cb) {
//            return Contact.update({personId: this.personId},
//                angular.extend({}, this, {_id:undefined}), cb);
//        };
//
//        Contact.prototype.destroy = function(cb) {
//            return Contact.remove({personId: this.personId}, cb);
//        };

        return Contact;
    })
    .factory("Calendar", function ($resource) {
        var Calendar = $resource("http://rest.thesnowpros.org/contact/profile.ashx");

        return Calendar;
    });


function MemberController ($scope, Member) {

    /*var member = */Member.get({personId:ProCard.currentUserId}, function( data ) {
        $scope.member = data.result;
    });

    $scope.save = function (mem) {
        var member = new Member(mem);
        member.$save();
    };

    $scope.preferedResortAssosciation = function (member) {
        return member.resorts[0];
    };

    $scope.sendCardTo = function (mem, contactId) {
        var member = new Member(mem);
        member.sendProcard(contactId, function () {
            confirm("Your card was sent.");
        });
    };
}

function ContactListController ($scope, Contact) {

    $scope.contacts =  Contact.query;

    Contact.get({},
        function (data) {
        $scope.contacts =  data.result;
    });

    $scope.contacts =  [{'firstName': 'Nexus S', 'lastName': 'Fast just got faster'},
                    {'firstName': 'Motorola XOOM', 'lastName': 'The next, next generation tablet'} ];
}

function CalendarController ($scope, Calendar) {

}

//function ListController ($scope, Calendar) {
//
//}

angular.module ('procard', ['vertservice']).
    config( function($routeProvider, $locationProvider) {
        // TODO: remove random number to get caching back
        $routeProvider.
            when('/myprocard/:personId', { controller:MemberController, templateUrl:'/memberCard.html?' + Math.random()*1000  }).
            when('/sendmyprocard/:personId', { controller:MemberController, templateUrl:'/sendCard.html?' + Math.random()*1000 }).
            when('/myinfo/:personId', { controller:MemberController, templateUrl:'/memberInfo.html?' + Math.random()*1000  }).
            when('/calendar', { controller:CalendarController, templateUrl:'/calendar.html?' + Math.random()*1000  }).
//            when('/edit/:tripId', { controller:EditController, templateUrl:'/tripDetail.html?' + Math.random()*1000 }).
//            when('/new', { controller:CreateCtrl, templateUrl:'/tripDetail.html?' + Math.random()*1000 }).
            otherwise({ redirectTo:'/' });

//        $locationProvider.html5Mode(true);
    });


ProCard.init();