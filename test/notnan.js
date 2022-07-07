const expect = require('chai').expect;
const notnan = require('../notnan');

describe(`notnan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if the argument is NaN`,
        function () {
            expect( notnan(NaN) ).to.be.false;
        }
    )

    it(`should return true if the argument is not NaN`,
        function () {
            expect( notnan() ).to.be.true;
            expect( notnan(undefined) ).to.be.true;
            expect( notnan(null) ).to.be.true;
            expect( notnan('') ).to.be.true;
            expect( notnan([]) ).to.be.true;
            expect( notnan({}) ).to.be.true;
            expect( notnan(notnan) ).to.be.true;
            expect( notnan(0) ).to.be.true;
            expect( notnan(-0) ).to.be.true;
            expect( notnan(0.0) ).to.be.true;
            expect( notnan(0n) ).to.be.true;
            expect( notnan(Symbol()) ).to.be.true;
            expect( notnan(false) ).to.be.true;
        }
    )

})
