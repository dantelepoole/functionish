const expect = require('chai').expect;
const isnan = require('../src/types/isnan');

describe(`isnan()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isnan() ).to.be.false;
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
            expect( isnan('NaN') ).to.be.false;
            expect( isnan([]) ).to.be.false;
            expect( isnan({}) ).to.be.false;
            expect( isnan(isnan) ).to.be.false;
            expect( isnan(42) ).to.be.false;
            expect( isnan(42n) ).to.be.false;
            expect( isnan(Symbol()) ).to.be.false;
            expect( isnan(false) ).to.be.false;
        }
    )
})
