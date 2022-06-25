const and = require('../and');
const expect = require('chai').expect;
const spy = require('sinon').spy;

const isnumber = spy( x => (typeof x === 'number') );
const isstring = spy( x => (typeof x === 'string') );
const iseven = spy( x => ((x%2) === 0) );
const isodd = spy( x => ((x%2) === 1) );
const ispositive = spy( x => ((x >= 0)) );
const isnegative = spy( x => ((x < 0)) );

const isevenpositivenumber = spy( and(isnumber, iseven, ispositive) );

function resethistory() {

    isnumber.resetHistory();
    isstring.resetHistory();
    iseven.resetHistory();
    isodd.resetHistory();
    ispositive.resetHistory();
    isnegative.resetHistory();
    isevenpositivenumber.resetHistory();
}

describe('and()', function() {

    beforeEach(resethistory);

    it('should have arity 0', 
        function() {
            expect(and.length).to.be.equal(0);
        }
    )

    describe('the function returned by and()', function() {

        it('should return a boolean', 
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

        it('should call each clause if it returns true', 
            function() {
                expect( isevenpositivenumber(2) ).to.be.true;
                expect( isevenpositivenumber.callCount ).to.be.equal(1);
                expect( isnumber.callCount ).to.be.equal(1);
                expect( iseven.callCount ).to.be.equal(1);
                expect( ispositive.callCount ).to.be.equal(1);
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
                expect(isnumber.callCount).to.be.equal(1);
                expect(iseven.callCount).to.be.equal(1);
                expect(isnegative.callCount).to.be.equal(1);

                resethistory();

                result = and(isnumber, isodd, ispositive)(2);
                expect(result).to.be.false;
                expect(isnumber.callCount).to.be.equal(1);
                expect(isodd.callCount).to.be.equal(1);
                expect(ispositive.callCount).to.be.equal(0);

                resethistory();
                
                result = and(isstring, iseven, ispositive)(2);
                expect(result).to.be.false;
                expect(isstring.callCount).to.be.equal(1);
                expect(isodd.callCount).to.be.equal(0);
                expect(ispositive.callCount).to.be.equal(0);
            }
        )


        it('should return true if no clauses or arguments are passed', 
            function() {
                expect( and()() ).to.be.true;
            }
        )
    })
})