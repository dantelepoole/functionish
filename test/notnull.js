const expect = require('chai').expect;
const notnull = require('../notnull');

describe(`notnull`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is null`,
        function () {
            expect( notnull(null) ).to.be.false;
        }
    )

    it(`should return true if its argument is not null`,
        function () {
            expect( notnull() ).to.be.true;
            expect( notnull(undefined) ).to.be.true;
            expect( notnull('null') ).to.be.true;
            expect( notnull(0) ).to.be.true;
            expect( notnull(-0) ).to.be.true;
            expect( notnull(NaN) ).to.be.true;
            expect( notnull(0n) ).to.be.true;
            expect( notnull([]) ).to.be.true;
            expect( notnull({}) ).to.be.true;
            expect( notnull(()=>{}) ).to.be.true;
        }
    )
})
