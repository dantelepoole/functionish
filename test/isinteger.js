const expect = require('chai').expect;
const isinteger = require('../src/types/isinteger');

describe(`isinteger()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isinteger() ).to.be.false;
        }
    )

    it(`should return true if its argument is a safe integer value`,
        function () {
            expect( isinteger(42) ).to.be.true;
            expect( isinteger(0) ).to.be.true;
            expect( isinteger( Number.MAX_SAFE_INTEGER ) ).to.be.true;
            expect( isinteger( Number.MIN_SAFE_INTEGER ) ).to.be.true;
        }
    )

    it(`should return false if its argument is not a safe, integer, numeric value`,
        function () {
            expect( isinteger(42.4) ).to.be.false;
            expect( isinteger(0.3) ).to.be.false;
            expect( isinteger( Number.MAX_VALUE ) ).to.be.false;
            expect( isinteger( Number.MIN_VALUE ) ).to.be.false;
            expect( isinteger(null) ).to.be.false;
            expect( isinteger(undefined) ).to.be.false;
            expect( isinteger('') ).to.be.false;
            expect( isinteger(Symbol()) ).to.be.false;
            expect( isinteger(x => x) ).to.be.false;
            expect( isinteger({}) ).to.be.false;
            expect( isinteger([]) ).to.be.false;
            expect( isinteger(new Date()) ).to.be.false;
        }
    )

    it(`should return false if its argument is a bigint`,
        function () {
            expect( isinteger(42n) ).to.be.false;
        }
    )

    it(`should return false if its argument is a string representation of an integer value`,
        function () {
            expect( isinteger('42') ).to.be.false;
        }
    )

    it(`should return true if its argument is a float representation of an integer value`,
        function () {
            expect( isinteger(42.0) ).to.be.true;
        }
    )
})