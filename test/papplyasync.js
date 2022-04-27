const expect = require('chai').expect;
const papplyasync = require('../papplyasync');

let papplyresult = undefined;

function sum(a,b) {
    papplyresult = (a+b);
    return papplyresult;
}

function raiseerror(name, message) {
    
    const error = new Error(message);
    error.name = name;

    papplyresult = error;

    throw error;
}

describe(`papplyasync()`, function() {

    beforeEach(
        function() {
            papplyresult = undefined;
        }
    )

    it(`should return a promise`,
        function () {

            const promise = papplyasync(sum, 42, 1);
            expect(promise).to.be.a('Promise');

            return promise;
        }
    )

    it(`should resolve to return value of invoking its first argument with its other arguments`,
        function () {

            return papplyasync(sum, 42, 1).then(
                x => expect(x).to.be.equal(43)
            )
        }
    )

    it(`should reject with the thrown error if its first argument throws`,
        function () {

            return papplyasync(raiseerror, 'SomeError', 'foobar').catch(
                error => {
                    expect(error).to.be.an('Error');
                    expect(error.name).to.be.equal('SomeError');
                    expect(error.message).to.be.equal('foobar');
                }
            )
        }
    )

    it(`should run its first argument asynchronously`,
        function () {

            const promise = papplyasync(sum, 42, 1);

            expect(papplyresult).to.be.undefined;

            return promise.then(
                x => {
                    expect(x).to.be.equal(43);
                    expect(papplyresult).to.be.equal(43);
                }
            )
        }
    )
})