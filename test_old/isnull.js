const expect = require('chai').expect;
const isnull = require('../src/types/isnull');

describe(`isnull`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isnull() ).to.be.false;
        }
    )

    it(`should return true if its argument is null`,
        function () {
            expect( isnull(null) ).to.be.true;
        }
    )

    it(`should return false if its argument is not null`,
        function () {
            expect( isnull() ).to.be.false;
            expect( isnull(undefined) ).to.be.false;
            expect( isnull('null') ).to.be.false;
            expect( isnull(42) ).to.be.false;
            expect( isnull(NaN) ).to.be.false;
            expect( isnull(0n) ).to.be.false;
            expect( isnull([]) ).to.be.false;
            expect( isnull({}) ).to.be.false;
            expect( isnull(x => x) ).to.be.false;
        }
    )
})
