const expect = require('chai').expect;
const presolve = require('../presolve');

function noop() {}

const markerobject = {};

describe(`presolve()`, function() {

    beforeEach(
        function() {
        }
    )

    it(`should return a promise`,
        function () {
            const promise = presolve(42);
            expect( promise ).to.be.a('Promise');
            return promise;
        }
    )

    it(`should return a promise that resolves to the argument passed to presolve()`,
        function () {
            return presolve( markerobject )
                        .then( x => expect(x).to.be.equal(markerobject) );
        }
    )
})