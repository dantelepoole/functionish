const array = require('../src/array');
const expect = require('chai').expect;
const isiterable = require('../src/isiterable');
const predicate = require('../src/predicate');
const range = require('../src/range');
const transform = require('../src/transform');
const transduce = require('../src/transduce');

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

    it(`should be curried`,
        function() {

            const curried = transform(double);
            expect(curried).to.be.a('function');
            expect( array( curried( range(3) ) ) ).to.deep.equal([2,4,6]);
        }
    )

    it(`should throw if the transducer is neither a transducer function nor an array of transformations`,
        function() {
            expect( ()=>transform(double,{}) ).to.throw();
            expect( ()=>transform([double], range(3)) ).not.to.throw();

            const transducer = transduce( predicate(iseven) );
            expect( ()=>transform(transducer,range(3)) ).not.to.throw();
        }
    )

    it(`should throw if the list is not an iterable object`,
        function() {
            expect( ()=>transform([double],{}) ).to.throw();
            expect( ()=>transform([double],null) ).to.throw();
        }
    )

    it(`should return an iterable object`,
        function() {
            expect( isiterable( transform([double],range(3)) ) ).to.be.true;
        }
    )
    
    describe(`the iterable returned by transform()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should apply the transducer's transformations in order`,
            function() {
                const iterable = transform( [predicate(iseven), double], [2,4,6] );
                const result = array(iterable);

                expect(result).to.deep.equal([4,8,12]);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(3);
            }
        )

        it(`should apply the transducer's transformations in a short circuited manner`,
            function() {
                const iterable = transform( [predicate(iseven), double], range(3) );
                const result = array(iterable);

                expect(result).to.deep.equal([4]);
                expect(iseven.callCount).to.equal(3);
                expect(double.callCount).to.equal(1);
            }
        )
    })
})