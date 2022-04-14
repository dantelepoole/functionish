const any = require('../any');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

let callcount = 0;
function isnumber(x) { callcount += 1; return typeof x ==='number'; };
function isstring(x) { callcount += 1; return typeof x === 'string' };
function isgreaterthan(num, x) { callcount += 1; return (x > num) };

describe('any()', function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it('should return false for an empty list argument',
        function() {
            expect( any(isnumber, []) ).to.be.false;
        }
    )

    it('should return false if its predicate argument returns false for each item in the list',
        function() {
            expect( any(isstring, numbers1to10) ).to.be.false;
        }
    )

    it('should return true if its predicate argument returns true for one item in the list',
        function() {

            const isgreaterthan9 = isgreaterthan.bind(null, 9);
            expect( any(isgreaterthan9, numbers1to10) ).to.be.true;
        }
    )

    it('should run its predicate argument once for each item in the list if the predicate returns false for each item',
        function() {
            const result = any(isstring, numbers1to10);
            expect( result ).to.be.false;
            expect( callcount ).to.be.equal(10);
        }
    )

    it('should be short-circuited',
        function() {
            const isgreaterthan4 = isgreaterthan.bind(null, 4);
            const result = any(isgreaterthan4, numbers1to10);
            expect( result ).to.be.true;
            expect( callcount ).to.be.equal(5);
        }
    )
})