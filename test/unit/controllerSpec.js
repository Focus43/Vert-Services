'use strict';

describe('Vert Controllers', function(){
    describe('VertCtrl', function(){
        it('should create "phones" model with 3 phones', function(){
            var scope = {},
                ctrl  = new PhoneListCtrl(scope);
            expect(scope.phones.length).toBe(2);
        });
    });
});