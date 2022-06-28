const expect = require('chai').expect;
const notnumber = require('../notnumber');

describe(`notnumber()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type number`,
        function () {
            expect( notnumber(0) ).to.be.false;
            expect( notnumber(1.33) ).to.be.false;
            expect( notnumber(-1) ).to.be.false;
            expect( notnumber( 1/3 ) ).to.be.false;
            expect( notnumber(Number.MAX_SAFE_INTEGER) ).to.be.false;
            expect( notnumber(Number.MAX_VALUE) ).to.be.false;
            expect( notnumber(Number.MIN_SAFE_INTEGER) ).to.be.false;
            expect( notnumber(Number.MIN_VALUE) ).to.be.false;
            expect( notnumber(Number.EPSILON) ).to.be.false;
            expect( notnumber(Infinity) ).to.be.false;
            expect( notnumber(Number.POSITIVE_INFINITY) ).to.be.false;
            expect( notnumber(Number.NEGATIVE_INFINITY) ).to.be.false;
        }
    )

    it(`should return true if its argument is NaN`,
        function () {
            expect( notnumber(NaN) ).to.be.true;
        }
    )

    it(`should return true if its argument has a type other than number`,
        function () {
            expect( notnumber('1') ).to.be.true;
            expect( notnumber(false) ).to.be.true;
            expect( notnumber({}) ).to.be.true;
            expect( notnumber([]) ).to.be.true;
            expect( notnumber( ()=>{} ) ).to.be.true;
        }
    )

    it(`should return true if its argument has type bigint`,
        function () {
            expect( notnumber(0n) ).to.be.true;
        }
    )
})
