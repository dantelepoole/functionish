const expect = require('chai').expect;
const isnull = require('../isnull');

describe(`isnull`, function() {

    beforeEach(
        function() {

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
            expect( isnull(0) ).to.be.false;
            expect( isnull(-0) ).to.be.false;
            expect( isnull(NaN) ).to.be.false;
            expect( isnull(0n) ).to.be.false;
            expect( isnull([]) ).to.be.false;
            expect( isnull({}) ).to.be.false;
            expect( isnull(()=>{}) ).to.be.false;
        }
    )
})
