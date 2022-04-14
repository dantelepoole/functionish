const all = require('../all');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

let callcount = 0;
function isnumber(x) { callcount += 1; return typeof x ==='number'; };
function islessthan(num, x) { callcount += 1; return (x < num); };

describe('all()', function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it('should return true for an empty list argument',
        function() {
            expect( all(isnumber, []) ).to.be.true;
        }
    )

    it('should return true if its predicate argument returns true for each item in the list',
        function() {
            expect( all(isnumber, numbers1to10) ).to.be.true;
        }
    )

    it('should return false if its predicate argument returns false for one item in the list',
        function() {

            const islessthan10 = islessthan.bind(null, 10);
            expect( all(islessthan10, numbers1to10) ).to.be.false;
        }
    )

    it('should run its predicate argument once for each item in the list if the predicate returns true for each item',
        function() {
            const result = all(isnumber, numbers1to10);
            expect( result ).to.be.true;
            expect( callcount ).to.be.equal(10);
        }
    )

    it('should be short-circuited',
        function() {
            const islessthan5 = islessthan.bind(null, 5);
            const result = all(islessthan5, numbers1to10);
            expect( result ).to.be.false;
            expect( callcount ).to.be.equal(5);
        }
    )
})