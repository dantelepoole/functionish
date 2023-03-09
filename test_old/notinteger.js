const expect = require('chai').expect;
const notinteger = require('../notinteger');

describe(`notinteger()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if the value is a (safe) integer`,
        function () {
            expect( notinteger(42) ).to.be.false;
            expect( notinteger(-42) ).to.be.false;
            expect( notinteger(0) ).to.be.false;
            expect( notinteger(3.0) ).to.be.false;
        }
    )

    it(`should return true if the value is not a number`,
        function () {
            expect( notinteger('foobar') ).to.be.true;
            expect( notinteger({}) ).to.be.true;
            expect( notinteger(notinteger) ).to.be.true;
        }
    )

    it(`should return true if the value is NaN, null or undefined`,
        function () {
            expect( notinteger(NaN) ).to.be.true;
            expect( notinteger(null) ).to.be.true;
            expect( notinteger(undefined) ).to.be.true;
            expect( notinteger() ).to.be.true;
        }
    )

    it(`should return false if the value is a float that equals a whole number`,
        function () {
            expect( notinteger(3.0) ).to.be.false;
            expect( notinteger(0.0) ).to.be.false;
            expect( notinteger(42.00000000) ).to.be.false;
        }
    )

    it(`should return true if the value a non-integer number`,
        function () {
            expect( notinteger(3.33) ).to.be.true;
            expect( notinteger(0.1) ).to.be.true;
            expect( notinteger(42.000000001) ).to.be.true;
        }
    )
})
