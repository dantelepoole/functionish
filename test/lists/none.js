const none = require('../../src/lists/none');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const emptylist = { [Symbol.iterator]:Array.prototype.values.bind([]) }
const list1to10 = { [Symbol.iterator]:Array.prototype.values.bind([1,2,3,4,5,6,7,8,9,10]) }

const is5 = fake(x => (x === 5));
const isnumber = fake( x => typeof x ==='number' );
const islessthan = fake( (num, x) => (x < num) );
const isstring = fake(x => typeof x === 'string');

describe('none()', function() {

    beforeEach(
        function() {
            is5.resetHistory();
            isnumber.resetHistory();
            islessthan.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            should.return.true(none, isstring, emptylist)
            should.not.be.called(isstring);
        }
    )

    it('should return false if the predicate returns true for any item in the list',
        function() {
            should.return.false(none, is5,list1to10);
        }
    )

    it('should return true if the predicate returns false for all items in the list',
        function() {
            should.return.true(none, isstring, list1to10);
        }
    )

    it('should call the predicate once for each item in the list if none() returns true',
        function() {
            should.return.true(none, isstring, list1to10);
            should.be(10, isstring.callCount);
        }
    )

    it('should short-circuit as soon as the predicate returns true',
        function() {

            should.return.false(none, is5, list1to10);
            should.be(5, is5.callCount);
        }
    )

    it('should be curried with unary arity',
        function () {

            should.be.a.function( none(is5) );
            should.return.a.boolean( none(is5), list1to10 );
            
        }
    )

    it(`should test the list item's boolish values if the predicate is null or undefined`,
        function () {

            should.return.false(none, null, list1to10);
            should.return.false(none, undefined, list1to10);
            should.return.true(none, null, [0,'',false,-0,0n]);
            should.return.true(none, undefined, [0,'',false,-0,0n]);
        }
    )

    it('should throw if the predicate is not a function nor null or undefined',
        function () {
            should.throw(none, 41, list1to10);
        }
    )

    it('should throw if the list is not iterable',
        function () {
            should.throw(none, isnumber, {});
        }
    )
})