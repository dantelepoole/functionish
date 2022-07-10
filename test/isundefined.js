const expect = require('chai').expect;
const isundefined = require('../src/isundefined');

describe(`isundefined()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument is undefined`,
        function () {
            expect( isundefined(undefined) ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( isundefined(null) ).to.be.false;
            expect( isundefined({}) ).to.be.false;
            expect( isundefined([]) ).to.be.false;
            expect( isundefined(42) ).to.be.false;
            expect( isundefined('foobar') ).to.be.false;
            expect( isundefined(true) ).to.be.false;
            expect( isundefined(NaN) ).to.be.false;
        }
    )
})