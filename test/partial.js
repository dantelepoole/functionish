const expect = require('chai').expect;
const partial = require('../partial');

function sum(a,b) {
    return (a+b);
}

function returnthis() {
    return this;
}

function returnarguments(...args) {
    return args;
}

describe(`partial()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( partial(sum, 1) ).to.be.a('function');
        }
    )

    it(`should return a bound function`,
        function () {
            const increment = partial(sum, 1);
            const isbound = increment.name.startsWith('bound ');
            expect( isbound ).to.be.true;
        }
    )

    it(`should return a function whose 'this' is the 'global' object`,
        function () {
            const thistest = partial(returnthis);
            expect( thistest() ).to.be.equal(global);
        }
    )

    it(`should return a function that receives its own arguments prepended by the second and further arguments passed to partial()`,
        function () {
            const argumentstest = partial(returnarguments, 42, 33);
            const result = argumentstest('foobar');
            expect( result ).to.be.deep.equal([42,33,'foobar']);
        }
    )
})