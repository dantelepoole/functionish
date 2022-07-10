const expect = require('chai').expect;
const or = require('../src/or');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const isstring = spy( x => typeof x === 'string');
const iseven = spy( x => (x%2) === 0);
const isodd = spy( x => Math.abs(x%2) === 1);
const ispositive = spy( x => (x >= 0));
const isnegative = spy( x => (x < 0));

const isoddorpositivenumber = or(isodd, ispositive);

describe('or()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should return a boolean', 
        function() {
            expect( isoddorpositivenumber ).to.be.a('function');
        }
    )

    describe('the function returned by or()', function() {

        it('should return a boolean', 
            function() {
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
                expect( isodd.callCount ).to.equal(1);
                expect( ispositive.callCount).to.equal(1);
            }
        )

        it(`should evaluate a clause's value if the clause is not a function`, 
            function() {
                const conditional = or(false,isodd);
                expect( conditional(42) ).to.be.false;
                expect( conditional(41) ).to.be.true;
            }
        )

        it('should be short-circuited', 
            function() {
                let result = or(iseven, isnegative)(2);
                expect(iseven.calledOnce).to.be.true;
                expect(isnegative.called).to.be.false;

                sandbox.resetHistory();

                result = or(isodd, ispositive)(2);
                expect(isodd.calledOnce).to.be.true;
                expect(ispositive.calledOnce).to.be.true;

                sandbox.resetHistory();

                result = or(isstring, ispositive)(-42);
                expect(isstring.calledOnce).to.be.true;
                expect(ispositive.calledOnce).to.be.true;
            }
        )


        it('should return false if no clauses or arguments are passed', 
            function() {
                expect( or()() ).to.be.false;
            }
        )

    })
})