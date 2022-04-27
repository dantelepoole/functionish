const expect = require('chai').expect;
const pfinally = require('../pfinally');

let finallycalled = false;

function dofinally() {
    finallycalled = true;
}

describe(`pfinally()`, function() {

    beforeEach(
        function() {
            finallycalled = false;
        }
    )

    it(`should return a promise that calls the first argument before it resolves`,
        function () {

            const promise = pfinally( dofinally, Promise.resolve(42) );
            expect(promise).to.be.a('Promise');

            return promise.then(
                x => {
                    expect(x).to.be.equal(42);
                    expect(finallycalled).to.be.true;
                }
            )
        }
    )

    it(`should return a promise that calls the first argument before it rejects`,
        function () {

            const promise = pfinally( dofinally, Promise.reject(new Error('foobar')) );
            expect(promise).to.be.a('Promise');

            return promise.catch(
                error => {
                    expect(error).to.be.a('Error');
                    expect(error.message).to.be.equal('foobar');
                    expect(finallycalled).to.be.true;
                }
            )
        }
    )

    it(`should be curried`,
        function () {

            const curried = pfinally(dofinally);
            expect(curried).to.be.a('function');

            const promise = curried( Promise.resolve(42) );
            expect(promise).to.be.a('Promise');

            return promise.then(
                x => {
                    expect(x).to.be.equal(42);
                    expect(finallycalled).to.be.true;
                }
            )
        }
    )

})