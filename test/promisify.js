const expect = require('chai').expect;
const promisify = require('../promisify');

function sum(a,b) {
    return (a+b);
}

function returnarguments(...args) {
    return args;
}

function raiseerror(message, name) {
    
    const error = new Error(message);
    if( name ) error.name = name;

    throw error;
}

describe(`promisify()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expect( promisify(sum) ).to.be.a('function');
        }
    )

    it(`should pre-bind its second and further arguments to its first argument`,
        function () {
            const promisified = promisify(returnarguments, 42, 1);
            return promisified().then(
                x => expect(x).to.be.deep.equal([42,1])
            )
        }
    )

    it(`should return a function that returns a promise that resolves to the result of the returned function`,
        function () {
            const promisified = promisify(sum, 42);
            return promisified(1).then(
                x => expect(x).to.be.equal(43)
            )
        }
    )

    it(`should reject with the thrown error if its first argument throws`,
        function () {

            const promisified = promisify(raiseerror, 'foobar', 'FailError');
            return promisified().catch(
                error => {
                    expect(error).to.be.an('Error');
                    expect(error.name).to.be.equal('FailError');
                    expect(error.message).to.be.equal('foobar');
                }
            )
        }
    )
})