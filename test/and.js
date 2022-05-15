const and = require('../and');
const expect = require('chai').expect;

let callcount = 0;

const isnumber = x => (callcount +=1, typeof x === 'number');
const isstring = x => (callcount +=1, typeof x === 'string');
const iseven = x => (callcount +=1, (x%2) === 0);
const isodd = x => (callcount +=1, (x%2) === 1);
const ispositive = x => (callcount +=1, (x >= 0));
const isnegative = x => (callcount +=1, (x < 0));

const isevenpositivenumber = and(isnumber, iseven, ispositive);

describe('and()', function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it('should have arity 0', 
        function() {
            expect(and.length).to.be.equal(0);
        }
    )

    it('should return a function that returns a boolean', 
        function() {
            expect( isevenpositivenumber ).to.be.a('function');
            expect( isevenpositivenumber(2) ).to.be.a('boolean');
            expect( isevenpositivenumber(1) ).to.be.a('boolean');
        }
    )

    it('should return true if all the clauses return true', 
        function() {
            expect( isevenpositivenumber(2) ).to.be.true;
        }
    )

    it('should call each clause once as long as they return true', 
        function() {
            expect( isevenpositivenumber(2) ).to.be.true;
            expect( callcount ).to.be.equal(3);
        }
    )

    it('should return false if any clause returns false', 
        function() {
            expect( 
                and(isnumber, iseven, isnegative)(2)
                ||
                and(isnumber, isodd, ispositive)(2)
                ||
                and(isstring, iseven, ispositive)(2)
            ).to.be.false;
        }
    )

    it('should be short-circuited', 
        function() {
            let result = and(isnumber, iseven, isnegative)(2);
            expect(result).to.be.false;
            expect(callcount).to.be.equal(3);

            callcount = 0;
            result = and(isnumber, isodd, ispositive)(2);
            expect(result).to.be.false;
            expect(callcount).to.be.equal(2);

            callcount = 0;
            result = and(isstring, iseven, ispositive)(2);
            expect(result).to.be.false;
            expect(callcount).to.be.equal(1);
        }
    )


    it('should return true if no clauses or arguments are passed', 
        function() {
            expect( and()() ).to.be.true;
        }
    )

    it('can be called as a unary function or a variadic function',
        function() {
            expect( and( [isnumber, iseven, ispositive] )(2) ).to.be.true;
            expect( and( isnumber, iseven, ispositive )(2) ).to.be.true;
        }
    )
})