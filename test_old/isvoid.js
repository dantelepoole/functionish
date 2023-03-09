const expect = require('chai').expect;
const isvoid = require('../src/types/isvoid');

describe(`isvoid()`, function() {

    it(`should return true when called without arguments`,
        function () {
            expect( isvoid() ).to.be.true;
        }
    )

    it(`should return true if its argument is null, undefined or NaN`,
        function () {
            expect( isvoid(null) ).to.be.true;
            expect( isvoid(undefined) ).to.be.true;
            expect( isvoid(NaN) ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( isvoid({}) ).to.be.false;
            expect( isvoid([]) ).to.be.false;
            expect( isvoid(42) ).to.be.false;
            expect( isvoid('null') ).to.be.false;
            expect( isvoid(true) ).to.be.false;
            expect( isvoid( Symbol() ) ).to.be.false;
            expect( isvoid(x => x) ).to.be.false;
            expect( isvoid(42n) ).to.be.false;
        }
    )
})
