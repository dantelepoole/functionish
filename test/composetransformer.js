const composetransformer = require('../lib/composetransformer');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const double = spy(
    function double(x) {
        return (x*2);
    }
)

const increment = spy(
    function increment(x) {
        return (x+1);
    }
)

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

describe(`composetransformer()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function() {
            expect(composetransformer(iseven,double)).to.be.a('function');
        }
    )

    it(`should throw if any of its arguments are not functions`,
        function() {
            expect( ()=>composetransformer(iseven,{}) ).to.throw();
        }
    )
    
    describe(`the transformer return by composetransformer()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should call each transformer in order with the previous transformer's return value`,
            function () {

                const transformer = composetransformer(double, increment);
                expect( transformer(2) ).to.equal(5);
                expect( double.calledOnceWith(2) ).to.be.true;
                expect( increment.calledOnceWith(4) ).to.be.true;
            }
        )

        it(`should return its argument if composetransform() was called without arguments`,
            function () {

                const transformer = composetransformer();
                expect( transformer(2) ).to.equal(2);
            }
        )

        it(`should return false if any of the transformers returns false`,
            function () {

                let transformer = composetransformer(iseven);
                expect( transformer(1) ).to.be.false;

                transformer = composetransformer(increment, iseven, double);
                expect( transformer(2) ).to.be.false;
            }
        )

        it(`should return its argument if it has a single transformer that returns true`,
            function () {

                const transformer = composetransformer(iseven);
                expect( transformer(2) ).to.equal(2);
            }
        )

        it(`should pass through a transformer's argument if that transformer returns true`,
            function () {

                const transformer = composetransformer(increment, iseven, double);
                expect( transformer(1) ).to.equal(4);
                expect( double.calledOnceWith(2) ).to.be.true;
                expect( iseven.calledOnceWith(2) ).to.be.true;
            }
        )

        it(`should be short-circuited`,
            function () {

                const transformer = composetransformer(increment, iseven, double);
                expect( transformer(2) ).to.be.false;
                expect( increment.calledOnceWith(2) ).to.be.true;
                expect( iseven.calledOnceWith(3) ).to.be.true;
                expect( double.callCount ).to.equal(0);
            }
        )
    })
})