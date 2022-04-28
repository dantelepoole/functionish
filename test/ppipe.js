const expect = require('chai').expect;
const ppipe = require('../ppipe');

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

describe(`ppipe()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a promise that resolves to the first argument passed to the returned function when ppipe() is called without arguments`,
        function () {
            const pipe = ppipe();
            const promise = pipe(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(42) );
        }
    )

    it(`should return a function that passes its arguments to the arguments to ppipe() and return a promise that resolves to the result`,
        function () {
            const pipe = ppipe(id, expectvalue(42), increment, expectvalue(43), increment, expectvalue(44), increment);
            const promise = pipe(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(45) );
        }
    )

    it(`should also work when called as a unary function`,
        function () {
            const pipe = ppipe([id, expectvalue(42), increment, expectvalue(43), increment, expectvalue(44), increment]);
            const promise = pipe(42);
            expect(promise).to.be.a('Promise');

            return promise.then( expectvalue(45) );
        }
    )
})