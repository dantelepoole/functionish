const all = require('../src/all');
const expect = require('chai').expect;
const spy = require('sinon').spy;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

const isnumber = spy( function isnumber(x) { return typeof x ==='number'; } )
const islessthan = spy( function islessthan(num, x) { return (x < num); } )

describe('all()', function() {

    beforeEach(
        function() {
            isnumber.resetHistory();
            islessthan.resetHistory();
        }
    )

    it('should return true if the list is empty',
        function() {
            expect( all(isnumber, []) ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(0);
        }
    )

    it('should return true if the predicate returns true for each item in the list',
        function() {
            expect( all(isnumber, numbers1to10) ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(10);
        }
    )

    it('should return false if the predicate returns false for one or more items in the list',
        function() {

            const islessthan10 = islessthan.bind(null, 10);
            expect( all(islessthan10, numbers1to10) ).to.be.false;
            expect( islessthan.callCount ).to.be.equal(10);

            islessthan.resetHistory();
            const islessthan5 = islessthan.bind(null, 5);
            expect( all(islessthan5, numbers1to10) ).to.be.false;
            expect( islessthan.callCount ).to.be.equal(5);
        }
    )

    it('should call the predicate once for each item in the list if the predicate returns true for each item',
        function() {
            const result = all(isnumber, numbers1to10);
            expect( result ).to.be.true;
            expect( isnumber.callCount ).to.be.equal(numbers1to10.length);
        }
    )

    it('should be short-circuited',
        function() {
            const islessthan5 = islessthan.bind(null, 5);
            const result = all(islessthan5, numbers1to10);
            expect( result ).to.be.false;
            expect( islessthan.callCount ).to.be.equal(5);
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = all(isnumber);
            expect(result).to.be.a('function');
            result = result(numbers1to10)
            expect(result).to.be.true;
        }
    )

    it('should throw if the predicate is not a function',
        function () {
            expect( () => all(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if the list is not iterable',
        function () {
            expect( () => all(isnumber, {}) ).to.throw();
        }
    )
})