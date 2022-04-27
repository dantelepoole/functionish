const expect = require('chai').expect;
const pcompose = require('../pcompose');

function id(x) {
    return x;
}

function increment(arg){
    return (arg + 1);
}

function expectvalue(x){
    return function _expectvalue(arg) {
        expect(arg).to.be.equal(x);
        return arg;
    }
}

describe(`pcompose()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a promise that resolves to the first argument when pcompose() is called without arguments`,
        function () {
            const composition = pcompose();
            const promise = composition(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(42) );
        }
    )

    it(`should return a function that passes its arguments to the arguments to pcompose() from right to left and return a promise that resolves to the result`,
        function () {
            const composition = pcompose(increment, expectvalue(44), increment, expectvalue(43), increment, expectvalue(42), id);
            const promise = composition(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(45) );
        }
    )

    it(`should also work when called as a unary function`,
        function () {
            const composition = pcompose([increment, expectvalue(44), increment, expectvalue(43), increment, expectvalue(42), id]);
            const promise = composition(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(45) );
        }
    )
})