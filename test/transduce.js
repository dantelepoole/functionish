const expect = require('chai').expect;
const reduce = require('../reduce');
const transduce = require('../transduce');
const transform = require('../transform');

function sum(a,b) { return (a+b) }
function double(x) { return (x*2) }
function square(x) { return (x*x) }
function iseven(x) { return (x%2) === 0 }

describe.skip(`transduce()`, function() {

    it(`should be curried with quaternary arity`,
        function () {

            let curried = transduce(double);
            expect(curried).to.be.a('function');

            curried = curried(sum);
            expect(curried).to.be.a('function');

            curried = curried(0);
            expect(curried).to.be.a('function');

            curried = curried([1,2,3]);
            expect(curried).to.be.a('number');
        }
    )

    it(`should return the result of passing the transformations and the reducer to transform() and passingn the result and the initialvalue and the list to reduce()`,
        function () {

            const result1 = transduce(double, sum, 0, [1,2,3]);
            expect(result1).to.be.equal(12);

            const reducer = transform(double, sum);
            const result2 = reduce(reducer, 0, [1,2,3]);
            expect(result2).to.be.equal(12);
        }
    )

    it(`should work with a transformation function as its first argument`,
        function () {

            const result1 = transduce(double, sum, 0, [1,2,3]);
            expect(result1).to.be.equal(12);
        }
    )

    it(`should work with an array of transformation functions as its first argument`,
        function () {

            const result1 = transduce([double, square], sum, 0, [1,2,3]);
            expect(result1).to.be.equal(56);
        }
    )
})