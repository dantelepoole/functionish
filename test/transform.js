const array = require('../array');
const expect = require('chai').expect;
const transform = require('../transform');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const double = spy(
    function double(x) {
        return (x*2);
    }
)

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

const sum = spy(
    function sum(a,b) {
        return (a+b);
    }
)

const always = x => () => x;

describe(`transform()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be curried`,
        function() {
            const curried = transform(double);
            expect(curried).to.be.a('function');
            expect( array(curried([1,2,3])) ).to.deep.equal([2,4,6]);
        }    
    )

    it(`should accept a single transformer or an array of transformers`,
        function() {
            expect( array(transform(double, [1,2,3]))).to.deep.equal([2,4,6]);
            expect( array(transform([iseven,double], [1,2,3])) ).to.deep.equal([4]);
        }    
    )

    it(`should throw if the list is not an iterable object`,
        function() {
            expect( ()=>transform(double, {}) ).to.throw();
        }    
    )

    it(`should throw if the transformer is neither a function nor an array of functions`,
        function() {
            expect( ()=>transform({}, []) ).to.throw();
        }    
    )

    it(`should throw if the transformer array contains one or more non-function items`,
        function() {
            expect( ()=>transform([{}], []) ).to.throw();
        }    
    )

    describe(`the iterable returned by transform()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should call the transformer on each iteration`,
            function() {
                expect( array(transform(iseven, [1,2,3])) ).to.deep.equal([2]);
                expect( iseven.callCount ).to.equal(3);
            }
        )

        it(`should drop each value for which the transformer returns the boolean value false`,
            function() {
                expect( array(transform(iseven,[1])) ).to.deep.equal([]);
            }
        )

        it(`should include each value for which the transformer returns the boolean value true`,
            function() {
                expect( array(transform(iseven,[2])) ).to.deep.equal([2]);
            }
        )

        it(`should include the transformer's return value if it has a non-boolean type`,
            function() {
                expect( array(transform(double,[1,2,3])) ).to.deep.equal([2,4,6]);
            }
        )

        it(`should include each value if the transformer argument to transform() was an empty array`,
            function() {
                expect( array(transform([], [1,2,3])) ).to.deep.equal([1,2,3]);
            }
        )
    })
})