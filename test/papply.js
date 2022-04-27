const expect = require('chai').expect;
const papply = require('../papply');

function sum(a,b) {
    return (a+b);
}

function raiseerror(name, message) {
    
    const error = new Error(message);
    error.name = name;

    throw error;
}

describe(`papply()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a promise`,
        function () {

            const promise = papply(sum, 42, 1);
            expect(promise).to.be.a('Promise');

            return promise;
        }
    )

    it(`should resolve to return value of invoking its first argument with its other arguments`,
        function () {

            return papply(sum, 42, 1).then(
                x => expect(x).to.be.equal(43)
            )
        }
    )

    it(`if its first argument returns a promise, it should return that same promise`,
        function () {

            let targetpromise = undefined;

            function idpromise(arg) {
                targetpromise = Promise.resolve(arg);
                return targetpromise;
            }

            const promise = papply(idpromise, 42);
            expect(promise).to.be.equal(targetpromise);

            return promise.then(
                x => expect(x).to.be.equal(42)
            );
        }
    )
})