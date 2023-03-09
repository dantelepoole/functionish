const expect = require('chai').expect;
const isnumber = require('../src/types/isnumber');

describe(`isnumber()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isnumber() ).to.be.false;
        }
    )

    it(`should return false if its argument is NaN`,
        function () {
            expect( isnumber(NaN) ).to.be.false;
        }
    )

    it(`should return true if its argument has type number and is not NaN`,
        function () {
            expect( isnumber(0) ).to.be.true;
            expect( isnumber(1.33) ).to.be.true;
            expect( isnumber(-1) ).to.be.true;
            expect( isnumber( 1/3 ) ).to.be.true;
            expect( isnumber(Number.MAX_SAFE_INTEGER) ).to.be.true;
            expect( isnumber(Number.MAX_VALUE) ).to.be.true;
            expect( isnumber(Number.MIN_SAFE_INTEGER) ).to.be.true;
            expect( isnumber(Number.MIN_VALUE) ).to.be.true;
            expect( isnumber(Number.EPSILON) ).to.be.true;
            expect( isnumber(Infinity) ).to.be.true;
            expect( isnumber(Number.POSITIVE_INFINITY) ).to.be.true;
            expect( isnumber(Number.NEGATIVE_INFINITY) ).to.be.true;
        }
    )

    it(`should return false if its argument has a type other than number`,
        function () {
            expect( isnumber('1') ).to.be.false;
            expect( isnumber(false) ).to.be.false;
            expect( isnumber({}) ).to.be.false;
            expect( isnumber([]) ).to.be.false;
            expect( isnumber(x => x) ).to.be.false;
        }
    )

    it(`should return false if its argument has type bigint`,
        function () {
            expect( isnumber(0n) ).to.be.false;
        }
    )
})
