const expect = require('chai').expect;
const isindexable = require('../src/types/isindexable');

describe(`isindexable()`, function() {


    it(`should return false when called without arguments`,
        function () {
            expect( isindexable() ).to.be.false;
        }
    )

    it(`should return true if its argument is an array`,
        function () {
            expect( isindexable([]) ).to.be.true;
            expect( isindexable( new Array(5) ) ).to.be.true;
        }
    )

    it(`should return true if its argument is a string`,
        function () {
            expect( isindexable('') ).to.be.true;
            expect( isindexable('foobar') ).to.be.true;
            expect( isindexable( String(42) ) ).to.be.true;
        }
    )

    it(`should return true if its argument is an object with a numeric length-property equal to 0`,
        function () {
            expect( isindexable( { length:0 } ) ).to.be.true;
        }
    )

    it(`should return false if its argument has a non-numeric length-property`,
        function () {
            expect( isindexable( { length:'foobar' }) ).to.be.false;
        }
    )

    it(`should return false if its argument has a length-property equal to NaN`,
        function () {
            expect( isindexable( { length:NaN }) ).to.be.false;
        }
    )

    it(`should return false if its argument has no length-property`,
        function () {
            expect( isindexable( {}) ).to.be.false;
        }
    )

    it(`should return true if its argument is an object with a numeric length-property larger than 0 and with non-undefined properties for key 0 and the key (length - 1)`,
        function () {

            const obj = {
                length : 42,
                [0]    : true,
                [41]   : true
            }

            expect( isindexable(obj) ).to.be.true;
        }
    )
})
