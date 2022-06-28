const expect = require('chai').expect;
const isvoid = require('../isvoid');

describe(`isvoid()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument is null or undefined`,
        function () {
            expect( isvoid(null) ).to.be.true;
            expect( isvoid(undefined) ).to.be.true;
        }
    )

    it(`should return true if called without arguments`,
        function () {
            expect( isvoid() ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( isvoid({}) ).to.be.false;
            expect( isvoid([]) ).to.be.false;
            expect( isvoid(42) ).to.be.false;
            expect( isvoid('foobar') ).to.be.false;
            expect( isvoid(true) ).to.be.false;
            expect( isvoid(Symbol()) ).to.be.false;
            expect( isvoid(NaN) ).to.be.false;
            expect( isvoid(isvoid) ).to.be.false;
        }
    )
})
