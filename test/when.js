const when = require('../src/when');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const alwaysfalsy = sinon.fake( () => '' );
const alwaystruthy = sinon.fake( () => 'true' );
const id = sinon.fake(x => x);
const iseven = sinon.fake(x => (x%2) === 0);
const double = sinon.fake(x => (x*2));
const raise = x => { throw new Error() }

describe( 'when()', function() {

    beforeEach(function () {
        sinon.resetHistory();
        id.resetHistory();
        iseven.resetHistory();
        double.resetHistory();
    })

    it('should be curried with unary arity', function() {

        const wheneven = when(iseven);
        expect(wheneven).to.be.a('function');

        const doublewheneven = wheneven(double);
        expect(doublewheneven).to.be.a('function');

        const retval = doublewheneven(42);
        expect(retval).to.be.equal(84);
    })

    describe( 'If the condition is not a function, when()', function() {

        it('should return the true-branch if the condition evaluates to a truthy, non-function value', function() {

            expect( when(true, UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( when(true, id, 42) ).to.equal(id);
            expect( when('true', UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( when({}, UNIQTHING, 42) ).to.equal(UNIQTHING);
            
        })

        it('should return the false-branch if the condition evaluates to a falsy value', function() {
            
            expect( when(false, 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( when(false, 42, id) ).to.equal(id);
            expect( when('', 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( when(null, 42, UNIQTHING) ).to.equal(UNIQTHING);
        })

        it('should return undefined if the condition evaluates to a falsy value and the false-branch is omitted', function() {
            
            expect( when(false, 42) ).to.be.undefined;
            expect( when('', 42) ).to.be.undefined;
            expect( when(null, 42) ).to.be.undefined
        })

    })

    describe( 'If the condition is a function, when()', function() {

        it('should return a function', function() {
            expect( when(iseven, double, id) ).to.be.a('function');
        })

        describe( 'The returned function', function() {

            it(`should throw if either the condition, the true-branch or the false-branch throw`, function() {

                expect( () => when(raise, double, id)(42) ).to.throw();
                expect( () => when(iseven, raise, id)(42) ).to.throw();
                expect( () => when(iseven, double, raise)(41) ).to.throw();
            })

            it('should pass its arguments to the condition', function() {
        
                const doublewheneven = when(iseven, double, id);
                
                expect(iseven.callCount).to.equal(0);

                doublewheneven(42);

                expect(iseven.callCount).to.equal(1);
            })

            it('should pass its arguments to the true-branch if the condition returns a truthy value', function() {
        
                const alwaysdouble = when(alwaystruthy, double, id);
                
                expect(double.callCount).to.equal(0);

                alwaysdouble(42);

                expect(double.callCount).to.equal(1);
                expect(double.args[0]).to.deep.equal([42]);
            })

            it(`should return the true-branch's value if the true-branch is not a function`, function() {
        
                const alwaysfubar = when(alwaystruthy, 'fubar');
                
                const retval = alwaysfubar(42);

                expect(retval).to.equal('fubar');
            })

            it('should pass its arguments to the false-branch if the condition returns a falsy value', function() {
        
                const alwaysdouble = when(alwaysfalsy, id, double);
                
                expect(double.callCount).to.equal(0);

                alwaysdouble(42);

                expect(double.callCount).to.equal(1);
                expect(double.args[0]).to.deep.equal([42]);
            })

            it(`should return the false-branch's value if the false-branch is not a function`, function() {
        
                const alwaysfubar = when(alwaysfalsy, 42, 'fubar');
                
                const retval = alwaysfubar(42);

                expect(retval).to.equal('fubar');
            })

            it(`should return it's own first argument if the false-branch argument is omitted`, function() {
        
                const neverdouble = when(alwaysfalsy, double);
                
                const retval = neverdouble(UNIQTHING, 'fubar', 42);

                expect(retval).to.equal(UNIQTHING);
            })
        })
    })
})