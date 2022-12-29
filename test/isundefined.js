const expect = require('chai').expect;
const isundefined = require('../src/types/isundefined');

describe(`isundefined()`, function() {

    it(`should return true when called without arguments`,
        function () {
            expect( isundefined() ).to.be.true;
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
            expect( isundefined('undefined') ).to.be.false;
            expect( isundefined(true) ).to.be.false;
            expect( isundefined(NaN) ).to.be.false;
            expect( isundefined(x => x) ).to.be.false;
            expect( isundefined(42n) ).to.be.false;
            expect( isundefined( Symbol() ) ).to.be.false;
        }
    )
})