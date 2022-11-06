const collect = require('../collect');
const expect = require('chai').expect;
const isiterable = require('../isiterable');
const predicate = require('../predicate');
const range = require('../range');
const transform = require('../transform');
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

describe(`transform`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should throw if any transformation is not a function`,
        function() {
            expect( ()=>transform(double,{}) ).to.throw();
        }
    )

    it(`should return a function`,
        function() {
            expect( transform(double) ).to.be.a('function');
        }
    )
    
    describe(`the function returned by transform()`, function() {

        it(`should throw if its argument is not an iterable object`,
            function() {
                const transformer = transform(double);
                expect( ()=>transformer({}) ).to.throw();
                expect( ()=>transformer(null) ).to.throw();
                expect( ()=>transformer() ).to.throw();
            }
        )

        it(`should return an iterable object`,
            function() {
                const transformer = transform(double);
                expect( isiterable( transformer([1,2,3]) ) ).to.be.true;
            }
        )
    })

    describe(`the iterable returned by the transformer`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should apply the transformations in order`,
            function() {
                const transformer = transform( predicate(iseven), double );
                const iterable = transformer( [2,4,6] );
                const result = collect(iterable);

                expect(result).to.deep.equal([4,8,12]);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(3);
            }
        )

        it(`should apply the transformations in a short circuited manner`,
            function() {
                const transformer = transform( predicate(iseven), double );
                const iterable = transformer( range(3) );
                const result = collect(iterable);

                expect(result).to.deep.equal([4]);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(1);
            }
        )
    })
})