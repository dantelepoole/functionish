const expect = require('chai').expect;
const notvoid = require('../src/notvoid');

describe(`notvoid()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is null, undefined or NaN`,
        function () {
            expect( notvoid(null) ).to.be.false;
            expect( notvoid(undefined) ).to.be.false;
            expect( notvoid(NaN) ).to.be.false;
        }
    )

    it(`should return false if called without arguments`,
        function () {
            expect( notvoid() ).to.be.false;
        }
    )

    it(`should return true if its argument has any other type`,
        function () {
            expect( notvoid({}) ).to.be.true;
            expect( notvoid([]) ).to.be.true;
            expect( notvoid(42) ).to.be.true;
            expect( notvoid('foobar') ).to.be.true;
            expect( notvoid(true) ).to.be.true;
            expect( notvoid(Symbol()) ).to.be.true;
            expect( notvoid(notvoid) ).to.be.true;
        }
    )
})
