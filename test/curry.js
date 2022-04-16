const expect = require('chai').expect;
const curry = require('../curry');

function sum(a,b) {
    return (a+b);
}

function countargs(...args) {
    return args.length;
}

function returnargs(...args) {
    return args;
}

describe(`curry()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( curry(sum) ).to.be.a('function');
            expect( curry(1, sum) ).to.be.a('function');
        }
    )

    it(`should collect the arity number of arguments before invoking the function`,
        function () {
            let curried = curry(sum); // arity = 2
            curried = curried(1);
            curried = curried(2);
            expect(curried).to.be.equal(3);

            curried = curry(5, countargs);
            curried = curried('foobar');
            curried = curried(null);
            curried = curried(undefined);
            curried = curried(NaN);
            curried = curried(42);
            expect(curried).to.be.equal(5);
        }
    )

    it(`should invoke the function with the collected arguments`,
        function () {
            curried = curry(5, returnargs);
            curried = curried('foobar');
            curried = curried(null);
            curried = curried(undefined);
            curried = curried(NaN);
            curried = curried(42);
            expect(curried).to.be.deep.equal(['foobar',null,undefined,NaN,42]);
        }
    )

    it(`should collect arguments in successive invocations or combined`,
        function () {
            curried = curry(5, returnargs);
            curried = curried('foobar');
            curried = curried(null, undefined, NaN, 42);
            expect(curried).to.be.deep.equal(['foobar',null,undefined,NaN,42]);
        }
    )

    it(`should read the arity from the function's length-property if passed only a single argument`,
        function () {

            let curried = curry(sum) // arity = 2
            expect( curried(42)(1) ).to.be.equal(43)

            curried = curry(countargs) // arity = 0
            expect( curried() ).to.be.equal(0);
        }
    )

})