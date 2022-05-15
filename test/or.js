const or = require('../or');
const expect = require('chai').expect;

let callcount = 0;

const isnumber = x => (callcount +=1, typeof x === 'number');
const isstring = x => (callcount +=1, typeof x === 'string');
const iseven = x => (callcount +=1, (x%2) === 0);
const isodd = x => (callcount +=1, Math.abs(x%2) === 1);
const ispositive = x => (callcount +=1, (x >= 0));
const isnegative = x => (callcount +=1, (x < 0));

const isoddorpositivenumber = or(isodd, ispositive);

describe('or()', function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it('should return a function that returns a boolean', 
        function() {
            expect( isoddorpositivenumber ).to.be.a('function');
            expect( isoddorpositivenumber(2) ).to.be.a('boolean');
            expect( isoddorpositivenumber(1) ).to.be.a('boolean');
        }
    )

    it('should return true if at least one clause returns true', 
        function() {
            expect( isoddorpositivenumber(2) ).to.be.true;
            expect( isoddorpositivenumber(-1) ).to.be.true;
        }
    )

    it('should call each clause once as long as they return false', 
        function() {
            expect( isoddorpositivenumber(-2) ).to.be.false;
            expect( callcount ).to.be.equal(2);
        }
    )

    it('should be short-circuited', 
        function() {
            let result = or(iseven, isnegative)(2);
            expect(result).to.be.true;
            expect(callcount).to.be.equal(1);

            callcount = 0;
            result = or(isodd, ispositive)(2);
            expect(result).to.be.true;
            expect(callcount).to.be.equal(2);

            callcount = 0;
            result = or(isstring, ispositive)(-42);
            expect(result).to.be.false;
            expect(callcount).to.be.equal(2);
        }
    )


    it('should return false if no clauses or arguments are passed', 
        function() {
            expect( or()() ).to.be.false;
        }
    )

    it('should return false if passed an empty array',
        function() {
            expect( or([])() ).to.be.false;
        }
    )

    it('can be called as a unary function or a variadic function',
        function() {
            expect( or( [iseven, ispositive] )(2) ).to.be.true;
            expect( or( iseven, ispositive )(2) ).to.be.true;
        }
    )
})