const expect = require('chai').expect;
const predicate = require('../predicate');
const transduce = require('../transduce');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

const isnumber = spy(
    function isnumber(x) {
        return (typeof x === 'number');
    }
)

const double = spy(
    function double(x) {
        return (x*2);
    }
)

const sum= spy(
    function sum(a,b) {
        return (a+b);
    }
)

describe(`transduce`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function() {
            expect( transduce() ).to.be.a('function');
        }
    )

    it(`should throw if any of the transformations are not functions`,
        function() {
            expect( ()=>transduce(double,{}) ).to.throw();
        }
    )

    it(`should accept existing transducer functions as transformations`,
        function() {
            const transducer = transduce( predicate(iseven) );
            const transducer2 = transduce( predicate(isnumber), transducer, double );

            const reducer = transducer2(sum);

            let result = [1,2,3,4,5].reduce(reducer, 0);
            expect(result).to.equal(12);
            expect(iseven.callCount).to.equal(5);
            expect(isnumber.callCount).to.equal(5);
            expect(double.callCount).to.equal(2);
            expect(sum.callCount).to.equal(2);

            sandbox.resetHistory();
            
            result = [1,'foo',3,'bar',5].reduce(reducer, 0);
            expect(result).to.equal(0);
            expect(iseven.callCount).to.equal(3);
            expect(isnumber.callCount).to.equal(5);
            expect(double.callCount).to.equal(0);
            expect(sum.callCount).to.equal(0);
        }
    )

    describe(`the transducer function returned by transduce()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should be named '_transducer_' so that it can be recognized as a transducer function`,
            function() {
                expect( transduce(double).name ).to.equal('_transducer_');
            }
        )

        it(`should throw if its reducer argument is not a function`,
            function() {
                expect( ()=>transduce(double)() ).to.throw();
                expect( ()=>transduce(double)({}) ).to.throw();
            }
        )

        it(`should return a reducer function`,
            function() {
                const transducer = transduce(double);
                const reducer = transducer(sum);
                expect( [1,2,3].reduce(reducer, 0) ).to.equal(12);
            }
        )
    })

    describe(`the reducer function returned by the transducer`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should pass a value to the transformations in order before calling the original reducer`,
            function() {
                const transducer = transduce( predicate(iseven), double );
                const reducer = transducer(sum);

                const result = [2,4,6].reduce(reducer, 0);

                expect(result).to.equal(24);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(3);
                expect(sum.callCount).to.equal(3);
            }
        )

        it(`should ignore any values that get rejected by any filter transformations`,
            function() {
                const transducer = transduce( predicate(iseven) );
                const reducer = transducer(sum);

                const result = [1,3,5].reduce(reducer, 0);

                expect(result).to.equal(0);
                expect(iseven.callCount).to.equal(3);
                expect(sum.callCount).to.equal(0);
            }
        )

        it(`should apply its filter transformations in a short circuited manner`,
            function() {
                const transducer = transduce( predicate(iseven), double );
                const reducer = transducer(sum);

                const result = [2,3,5].reduce(reducer, 0);

                expect(result).to.equal(4);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(1);
                expect(sum.callCount).to.equal(1);
            }
        )
    })
})