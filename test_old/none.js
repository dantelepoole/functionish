const expect = require('chai').expect;
const none = require('../none');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

const isnumber = spy( function isnumber(x) { return typeof x ==='number'; } );
const isstring = spy( function isstring(x) { return typeof x === 'string' } );

function isgreaterthan(num) {
    return spy(
        function(x) {
            return (num > x);
        }
    )
}

describe(`none()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should return true for an empty list',
        function() {
            expect( none(isnumber, []) ).to.be.true;
        }
    )

    it('should return true if the predicate returns false for each item in the list',
        function() {
            expect( none(isstring, numbers1to10) ).to.be.true;
        }
    )

    it('should return false if the predicate returns true for one or more items in the list',
        function() {
            expect( none(isgreaterthan(9), numbers1to10) ).to.be.false;
            expect( none(isgreaterthan(3), numbers1to10) ).to.be.false;
        }
    )

    it('should call the predicate once for each item in the list if the predicate returns false for each item',
        function() {
            none(isstring, numbers1to10);
            expect( isstring.callCount ).to.be.equal(10);
        }
    )

    it('should be short-circuited',
        function() {
            const isgreaterthan2 = isgreaterthan(2);
            none(isgreaterthan2, numbers1to10);
            expect( isgreaterthan2.callCount ).to.be.equal(1);
        }
    )

    it('should accept any iterable for the list',
        function() {
            expect( none(isstring, range(10)) ).to.be.true;
        }
    )

    it('should be curried with arity 2',
        function () {
            const curried = none(isstring);
            expect(curried).to.be.a('function');
            expect( curried(numbers1to10) ).not.to.be.a('function');
            expect( curried(numbers1to10) ).to.be.true;
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            expect( () => none(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if the list is not iterable',
        function () {
            expect( () => none(isnumber, 42) ).to.throw();
        }
    )

})
