const expect = require('chai').expect;
const predicate = require('../predicate');
const reduce = require('../reduce');
const transform = require('../transform');

function sum(a,b) { return (a+b) }
function double(x) { return (x*2) }
function square(x) { return (x*x) }
function iseven(x) { return (x%2) === 0 }

describe(`transform()`, function() {

    it(`should be curried with binary arity`,
        function () {

            let curried = transform(double);
            expect(curried).to.be.a('function');

            curried = curried(sum);
            expect( reduce(curried, 0, [1,2,3]) ).to.be.a('number');
        }
    )

    it(`should work with a function for the transformations argument`,
        function () {

            const transformer = transform(double, sum);
            const result = reduce(transformer, 0, [1,2,3]);
            expect(result).to.be.deep.equal(12);
        }
    )

    it(`should work with an array of functions for the transformations argument`,
        function () {

            const transformer = transform([double, square], sum);
            const result = reduce(transformer, 0, [1,2,3]);
            expect(result).to.be.deep.equal(56);
        }
    )

    describe(`transform()'s reducer function`, function() {

        it(`should be curried with binary arity`,
            function () {
                const result = transform(double, sum);
                expect( result ).to.be.a('function');
                
                const curried = result(0);
                expect(curried).to.be.a('function');
                expect( curried([1,2,3]) ).to.be.a('number');
            }
        )

        it(`should transform its second argument with the transformation before passing it the reducer along with the initial value`,
            function () {
                function reducer(accumulator, nextvalue) {
                    expect(nextvalue).to.be.equal(84);
                    return accumulator + nextvalue;
                }
                const transformer = transform(double, reducer);
                const result = transformer(3, 42);
                expect(result).to.be.equal(87);
            }
        )

        it(`should filter instead of transform with any transformation function that was first passed to predicate()`,
            function () {

                const transformer = transform([predicate(iseven), double], sum);
                const result = reduce(transformer, 0, [1,2,3]);
                expect(result).to.be.deep.equal(4);
            }
        )

    })
})