const expect = require('chai').expect;
const predicate = require('../predicate');
const transmap = require('../transmap');

function double(x) { return (x*2) }
function square(x) { return (x*x) }
function iseven(x) { return (x%2) === 0 }

describe(`transmap()`, function() {

    it(`should be curried with binary arity`,
        function () {

            const curried = transmap(double);
            expect(curried).to.be.a('function');

            const result = curried([1,2,3]);
            expect( result ).to.be.an('array');
        }
    )

    it(`should return an array`,
        function () {

            const result = transmap(double, [1,2,3]);
            expect( result ).to.be.an('array').with.length(3);
        }
    )

    it(`should apply its transformations to each item in the input array`,
        function () {

            const result = transmap(double, [1,2,3]);
            expect( result ).to.be.deep.equal([2,4,6]);
        }
    )

    it(`should work with a function for its transformations argument`,
        function () {

            const result = transmap(double, [1,2,3]);
            expect( result ).to.be.deep.equal([2,4,6]);
        }
    )

    it(`should work with an array of functions for its transformations argument`,
        function () {

            const result = transmap([double,square], [1,2,3]);
            expect( result ).to.be.deep.equal([4,16,36]);
        }
    )

    it(`should filter instead of transform if its transformations function was first passed to predicate()`,
        function () {

            const result = transmap(predicate(iseven), [1,2,3]);
            expect( result ).to.be.deep.equal([2]);
        }
    )
})