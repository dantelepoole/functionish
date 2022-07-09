const expect = require('chai').expect;
const transduce = require('../transduce');

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

describe(`transduce()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be curried`,
        function() {
            const curried = transduce(double);
            expect(curried).to.be.a('function');

            const reducer = curried(sum);
            expect(reducer).to.be.a('function').with.length(2);

            expect( [1].reduce(reducer, 0) ).to.equal(2);
        }    
    )

    it(`should accept a single transformer or an array of transformers`,
        function() {
            let transducer = transduce(double, sum);
            expect( [1,2,3].reduce(transducer, 0) ).to.equal(12);

            transducer = transduce([iseven,double], sum);
            expect( [1,2,3].reduce(transducer, 0) ).to.equal(4);
        }    
    )

    it(`should throw if the reducer is not a function`,
        function() {
            expect( ()=>transduce(double, {}) ).to.throw();
        }    
    )

    it(`should throw if the transformer is neither a function nor an array of functions`,
        function() {
            expect( ()=>transduce({}, sum) ).to.throw();
        }    
    )

    it(`should throw if the transformer array contains one or more non-function items`,
        function() {
            expect( ()=>transduce([{}], sum) ).to.throw();
        }    
    )

    describe(`the transducer returned by transduce()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should call the transformer on each call`,
            function() {
                const transducer = spy( transduce(iseven, sum) );
                expect( [1,2,3].reduce(transducer, 0) ).to.equal(2);
                expect( iseven.callCount ).to.equal( transducer.callCount );
            }
        )

        it(`should drop each value for which the transformer returns the boolean value false`,
            function() {
                const transducer = transduce(iseven, sum)
                expect( [1].reduce(transducer, 0) ).to.equal(0);
            }
        )

        it(`should include each value for which the transformer returns the boolean value true`,
            function() {
                const transducer = transduce(iseven, sum)
                expect( [2].reduce(transducer, 0) ).to.equal(2);
            }
        )

        it(`should include the transformer's return value if it has a non-boolean type`,
            function() {
                const sentinel = {};
                const transducer = transduce(always(sentinel), (a,b)=>b)
                expect( ['foobar'].reduce(transducer, 0) ).to.equal(sentinel);
            }
        )

        it(`should include each value if the transformer argument to transduce() was an empty array`,
            function() {
                const transducer = transduce([], (a,b)=>b)
                expect( ['foobar'].reduce(transducer, 0) ).to.equal('foobar');
            }
        )
    })
})