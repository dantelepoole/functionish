const none = require('../../src/lists/none');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10_array = [1,2,3,4,5,6,7,8,9,10];

const isnumber = spy( function isnumber(x) { return typeof x === 'number'; } )
const isstring = spy( function isstring(x) { return typeof x === 'string'; } )
const isgreaterthan = spy( function isgreaterthan(num, x) { return (x > num); } )

describe('none()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            isgreaterthan.resetHistory();
            isstring.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            expect( none(isnumber, []) ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(0);
        }
    )

    it('should return false if the predicate returns true for any item in the list',
        function() {

            const isgreaterthan5 = isgreaterthan.bind(null, 5);
            expect( none(isgreaterthan5, numbers1to10_array) ).to.be.false;
            expect( isgreaterthan.callCount ).to.be.equal(6);
        }
    )

    it('should return false if the predicate returns true for each item in the list',
        function() {

            const isgreaterthan10 = isgreaterthan.bind(null, 10);
            expect( none(isgreaterthan10, numbers1to10_array) ).to.be.true;
            expect( isgreaterthan.callCount ).to.be.equal(10);

        }
    )

    it('should call the predicate once for each item in the list if the predicate returns false for each item',
        function() {
            const result = none(isstring, numbers1to10_array);
            expect( result ).to.be.true;
            expect( isstring.callCount ).to.be.equal(numbers1to10_array.length);
        }
    )

    it('should short-circuit if any predicate returns true',
        function() {
            const isgreaterthan5 = isgreaterthan.bind(null, 5);
            const result = none(isgreaterthan5, numbers1to10_array);
            expect( result ).to.be.false;
            expect( isgreaterthan.callCount ).to.be.equal(6);
        }
    )

    it('should be curried with unary arity',
        function () {

            const result = none(isnumber);
            expect(result).to.be.a('function');
            expect( result(numbers1to10_array) ).to.be.false;
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            expect( () => none(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if the list is not iterable',
        function () {
            expect( () => none(isnumber, {}) ).to.throw();
        }
    )
})