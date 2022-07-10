const any = require('../src/any');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

const isnumber = spy( function isnumber(x) { return typeof x ==='number'; } )
const isstring = spy( function isstring(x) { return typeof x === 'string' } )
const isgreaterthan = spy( function isgreaterthan(num, x) { return (x > num) } )

describe('any()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should return false if the list is empty',
        function() {
            expect( any(isnumber, []) ).to.be.false;
        }
    )

    it('should return false if the predicate returns false for each item in the list',
        function() {
            expect( any(isstring, numbers1to10) ).to.be.false;
        }
    )

    it('should return true if the predicate returns true for at least one item in the list',
        function() {

            const isgreaterthan9 = isgreaterthan.bind(null, 9);
            expect( any(isgreaterthan9, numbers1to10) ).to.be.true;
        }
    )

    it('should run the predicate once for each item in the list if the predicate returns false',
        function() {
            const result = any(isstring, numbers1to10);
            expect( result ).to.be.false;
            expect( isstring.callCount ).to.be.equal(10);
        }
    )

    it('should be short-circuited',
        function() {
            const isgreaterthan4 = spy( isgreaterthan.bind(null, 4) );
            const result = any(isgreaterthan4, numbers1to10);
            expect( result ).to.be.true;
            expect( isgreaterthan4.callCount ).to.be.equal(5);
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = any(isnumber);
            expect(result).to.be.a('function');
            result = result(numbers1to10)
            expect(result).to.be.true;
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            expect( () => any(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if the list is not iterable',
        function () {
            expect( () => any(isnumber, 42) ).to.throw();
        }
    )
})