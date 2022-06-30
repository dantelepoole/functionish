const array = require('../array');
const range = require('../range');
const expect = require('chai').expect;
const isiterable = require('../isiterable');

describe('range()', function() {

    beforeEach(
        function() {
        }
    )

    it(`should return an iterable`, 
        function() {
            expect( isiterable( range(5) ) ).to.be.true;
            expect( isiterable( range(1,5) ) ).to.be.true;
        }
    )

    it(`should throw if it passed a negative integer as the sole argument`, 
        function() {
            expect( ()=>range(-1) ).to.throw();
        }
    )

    it(`should not throw on negative integers when two arguments are passed`, 
        function() {
            expect( ()=>range(-1, -5) ).not.to.throw();
        }
    )

    it(`should throw if either argument is not an integer number`, 
        function() {
            expect( ()=>range('a') ).to.throw();
            expect( ()=>range(1.33, 0) ).to.throw();
            expect( ()=>range(0, false) ).to.throw();
            expect( ()=>range(0.99, {}) ).to.throw();
        }
    )

    describe('the iterable returned by range()', function() {

        it('should, if passed one argument, return an iterable producing the numbers from 1 to the specified number', 
            function() {
                expect( array(range(5)) ).to.deep.equal([1,2,3,4,5]);
            }
        )

        it('should, if passed 0 as the sole argument, return an empty iterable', 
            function() {
                expect( array(range(0)) ).to.be.an('array').with.length(0);
            }
        )

        it('should, if passed two arguments, return an iterable producing the numbers from the lowest argument to the highest argument', 
            function() {
                expect( array(range(1,5)) ).to.deep.equal([1,2,3,4,5]);
                expect( array(range(5,1)) ).to.deep.equal([5,4,3,2,1]);
                expect( array(range(-1,-5)) ).to.deep.equal([-1,-2,-3,-4,-5]);
                expect( array(range(-5,-1)) ).to.deep.equal([-5,-4,-3,-2,-1]);
                expect( array(range(1,-3)) ).to.deep.equal([1,0,-1,-2,-3]);
                expect( array(range(-3,1)) ).to.deep.equal([-3,-2,-1,0,1]);
            }
        )

    })
})