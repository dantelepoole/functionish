const expect = require('chai').expect;
const isnan = require('../src/isnan');

describe(`isnan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument is NaN`,
        function () {
            expect( isnan(NaN) ).to.be.true;
        }
    )

    it(`should return false if its argument is any other value than NaN`,
        function () {
            expect( isnan() ).to.be.false;
            expect( isnan(undefined) ).to.be.false;
            expect( isnan(null) ).to.be.false;
            expect( isnan('') ).to.be.false;
            expect( isnan([]) ).to.be.false;
            expect( isnan({}) ).to.be.false;
            expect( isnan(isnan) ).to.be.false;
            expect( isnan(0) ).to.be.false;
            expect( isnan(-0) ).to.be.false;
            expect( isnan(0.0) ).to.be.false;
            expect( isnan(0n) ).to.be.false;
            expect( isnan(Symbol()) ).to.be.false;
            expect( isnan(false) ).to.be.false;
        }
    )
})
