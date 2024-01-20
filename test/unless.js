const unless = require('../src/unless');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const alwaysfalsy = sinon.fake( () => '' );
const alwaystruthy = sinon.fake( () => 'true' );
const id = sinon.fake(x => x);
const iseven = sinon.fake(x => (x%2) === 0);
const double = sinon.fake(x => (x*2));
const raise = x => { throw new Error() }

const numbers = [1,2,3,4,5]; // product: 120, sum:15
const product = sinon.fake( (...factors) => factors.reduce( (a,b)=>(a*b), 1 ) );
const sum = sinon.fake( (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 ) );

describe( 'unless()', function() {

    beforeEach(function () {
        sinon.resetHistory();
        id.resetHistory();
        iseven.resetHistory();
        double.resetHistory();
        product.resetHistory();
        sum.resetHistory();
    })

    it('should be curried with unary arity', function() {

        const unlesseven = unless(iseven);
        expect(unlesseven).to.be.a('function');

        const doubleunlesseven = unlesseven(double);
        expect(doubleunlesseven).to.be.a('function');

        const retval = doubleunlesseven(42);
        expect(retval).to.be.equal(42);
    })

    describe( 'If the condition is not a function, unless()', function() {

        it('should return the alternate-action if the condition evaluates to a truthy, non-function value', function() {

            expect( unless(true, 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( unless(true, 42, id) ).to.equal(id);
            expect( unless('true', 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( unless({}, 42, UNIQTHING) ).to.equal(UNIQTHING);
            
        })

        it('should return the main-action if the condition evaluates to a falsy value', function() {
            
            expect( unless(false, UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( unless(false, id, 42) ).to.equal(id);
            expect( unless('', UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( unless(null, UNIQTHING, 42) ).to.equal(UNIQTHING);
        })

        it('should return undefined if the condition evaluates to a truthy value and the alternate-action is omitted', function() {
            
            expect( unless(true, 42) ).to.be.undefined;
            expect( unless('true', 42) ).to.be.undefined;
            expect( unless({}, 42) ).to.be.undefined
        })

    })

    describe( 'If the condition is a function, unless()', function() {

        it('should return a function', function() {
            expect( unless(iseven, double, id) ).to.be.a('function');
        })

        describe( 'The returned function', function() {

            it(`should throw if either the condition, the main-action or the alternate action throw`, function() {

                expect( () => unless(raise, double, id)(42) ).to.throw();
                expect( () => unless(iseven, raise, id)(41) ).to.throw();
                expect( () => unless(iseven, double, raise)(42) ).to.throw();
            })

            it('should pass its arguments to the condition', function() {
        
                const doubleunlesseven = unless(iseven, double, id);
                
                expect(iseven.callCount).to.equal(0);

                doubleunlesseven(42);

                expect(iseven.callCount).to.equal(1);
            })

            it('should pass its arguments to the alternate-action if the condition returns a truthy value', function() {
        
                const alwaysdouble = unless(alwaystruthy, id, double);
                
                expect(double.callCount).to.equal(0);

                alwaysdouble(42);

                expect(double.callCount).to.equal(1);
                expect(double.args[0]).to.deep.equal([42]);
            })

            it(`should return the alternate action's value if the alternate action is not a function`, function() {
        
                const alwaysfubar = unless(alwaystruthy, id, 'fubar');
                
                const retval = alwaysfubar(42);

                expect(retval).to.equal('fubar');
            })

            it('should pass its arguments to the main action if the condition returns a falsy value', function() {
        
                const alwaysdouble = unless(alwaysfalsy, double, id);
                
                expect(double.callCount).to.equal(0);

                alwaysdouble(42);

                expect(double.callCount).to.equal(1);
                expect(double.args[0]).to.deep.equal([42]);
            })

            it(`should return the main action's value if the main action is not a function`, function() {
        
                const alwaysfubar = unless(alwaysfalsy, 'fubar', 42);
                
                const retval = alwaysfubar(42);

                expect(retval).to.equal('fubar');
            })

            it(`should return it's own first argument if the alternate branch argument is omitted and the condition returns a truthy value`, function() {
        
                const neverdouble = unless(alwaystruthy, double);
                
                const retval = neverdouble(UNIQTHING, 'fubar', 42);

                expect(retval).to.equal(UNIQTHING);
            })
        })

        describe( `The returned function's for()-method`, function() {

            it(`should return a function`, function() {
                expect( unless(iseven, double, id).for(42) ).to.be.a('function');
            })

            describe( `The function returned by the for()-method`, function() {

                it('should pass its arguments to the condition', function() {
        
                    const productorsum = unless(iseven, product, sum).for(42, 41, 40);
                    
                    expect(iseven.callCount).to.equal(0);
    
                    productorsum(...numbers);
    
                    expect(iseven.callCount).to.equal(1);
                    expect(iseven.args[0]).deep.equals([42,41,40])
                })

                it('should pass its own arguments to the main action if the condition returns a falsy value', function() {
        
                    const productorsum = unless(iseven, product, sum).for(41);
                    
                    expect(product.callCount).to.equal(0);
    
                    const retval = productorsum(...numbers);
    
                    expect(product.callCount).to.equal(1);
                    expect(product.args[0]).to.deep.equal(numbers);
                    expect(retval).to.equal(120);
                })

                it('should pass its own arguments to the alternate action if the condition returns a truthy value', function() {
        
                    const productorsum = unless(iseven, product, sum).for(42);
                    
                    expect(sum.callCount).to.equal(0);
    
                    const retval = productorsum(...numbers);
    
                    expect(sum.callCount).to.equal(1);
                    expect(sum.args[0]).to.deep.equal(numbers);
                    expect(retval).to.equal(15);
                })
            })
        })
    })
})