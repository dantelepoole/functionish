const whenx = require('../src/whenx');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }
const ANOTHERTHING = { label:'ANOTHERTHING'}

const numbers = [1,2,3,4,5]; // product: 120, sum:15

const product = sinon.fake( (...factors) => factors.reduce( (a,b)=>(a*b), 1 ) );
const sum = sinon.fake( (...numbers) => numbers.reduce( (a,b)=>(a+b), 0 ) );

const alwaysfalsy = sinon.fake( () => '' );
const alwaystruthy = sinon.fake( () => 'true' );
const id = sinon.fake(x => x);
const iseven = sinon.fake(x => (x%2) === 0);
const double = sinon.fake(x => (x*2));

const raise = x => { throw new Error() }

describe( 'whenx()', function() {

    beforeEach(function () {
        sinon.resetHistory();
        id.resetHistory();
        iseven.resetHistory();
        double.resetHistory();
        product.resetHistory();
        sum.resetHistory();
    })

    it('should be curried with unary arity', function() {

        const wheneven = whenx(iseven);
        expect(wheneven).to.be.a('function');

        const productwheneven = wheneven(product);
        expect(productwheneven).to.be.a('function');

        const retval = productwheneven(42, ...numbers);
        expect(retval).to.be.equal(120);
    })

    describe( 'If the condition is not a function, whenx()', function() {

        it('should return the true-branch if the condition evaluates to a truthy, non-function value', function() {

            expect( whenx(true, UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( whenx(true, id, 42) ).to.equal(id);
            expect( whenx('true', UNIQTHING, 42) ).to.equal(UNIQTHING);
            expect( whenx({}, UNIQTHING, 42) ).to.equal(UNIQTHING);
            
        })

        it('should return the false-branch if the condition evaluates to a falsy value', function() {
            
            expect( whenx(false, 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( whenx(false, 42, id) ).to.equal(id);
            expect( whenx('', 42, UNIQTHING) ).to.equal(UNIQTHING);
            expect( whenx(null, 42, UNIQTHING) ).to.equal(UNIQTHING);
        })

        it('should return undefined if the condition evaluates to a falsy value and the false-branch is omitted', function() {
            
            expect( whenx(false, 42) ).to.be.undefined;
            expect( whenx('', 42) ).to.be.undefined;
            expect( whenx(null, 42) ).to.be.undefined
        })

    })

    describe( 'If the condition is a function, whenx()', function() {

        it('should return a function', function() {
            expect( whenx(iseven, product, sum) ).to.be.a('function');
        })

        describe( 'The returned function', function() {

            it(`should throw if either the condition, the true-branch or the false-branch throw`, function() {

                expect( () => whenx(raise, double, id)(42) ).to.throw();
                expect( () => whenx(iseven, raise, id)(42) ).to.throw();
                expect( () => whenx(iseven, double, raise)(41) ).to.throw();
            })

            it('should pass its first argument to the condition', function() {
        
                const productorsum = whenx(iseven, product, sum);
                
                expect(iseven.callCount).to.equal(0);

                productorsum(42, ...numbers);

                expect(iseven.callCount).to.equal(1);
            })

            it('should pass its further arguments to the true-branch if the condition returns a truthy value', function() {
        
                const productorsum = whenx(iseven, product, sum);
                
                expect(product.callCount).to.equal(0);

                const retval = productorsum(42, ...numbers);

                expect(product.callCount).to.equal(1);
                expect(product.args[0]).to.deep.equal(numbers);
                expect(retval).to.equal(120);
            })

            it(`should return the true-branch's value if the true-branch is not a function`, function() {
        
                const alwaysfubar = whenx(alwaystruthy, 'fubar');
                
                const retval = alwaysfubar(42, ...numbers);

                expect(retval).to.equal('fubar');
            })

            it('should pass its further arguments to the false-branch if the condition returns a falsy value', function() {
        
                const productorsum = whenx(iseven, product, sum);
                
                expect(product.callCount).to.equal(0);

                const retval = productorsum(41, ...numbers);

                expect(sum.callCount).to.equal(1);
                expect(sum.args[0]).to.deep.equal(numbers);
                expect(retval).to.equal(15);
            })

            it(`should return the false-branch's value if the false-branch is not a function`, function() {
        
                const alwaysfubar = whenx(alwaysfalsy, 42, 'fubar');
                
                const retval = alwaysfubar(42, ...numbers);

                expect(retval).to.equal('fubar');
            })

            it(`should return it's second argument if the false-branch argument is omitted`, function() {
        
                const neverdouble = whenx(alwaysfalsy, double);
                
                const retval = neverdouble('fubar', UNIQTHING, 42);

                expect(retval).to.equal(UNIQTHING);
            })
        })
    })

})