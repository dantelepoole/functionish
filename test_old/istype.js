const expect = require('chai').expect;
const istype = require('../src/types/istype');

describe(`istype()`, function() {

    it(`should return true if the type is 'null' and the value is null`,
        function () {
            expect( istype('null', null) ).to.be.true;
        }
    )

    it(`should return false if the type is 'object' and the value is null`,
        function () {
            expect( istype('object', null) ).to.be.false;
        }
    )

    it(`should return true if the type is 'NaN' and the value is NaN`,
        function () {
            expect( istype('NaN', NaN) ).to.be.true;
        }
    )

    it(`should return false if the type is 'number' and the value is NaN`,
        function () {
            expect( istype('number', NaN) ).to.be.false;
        }
    )

    it(`for values other than null and NaN: should return true if the type matches the value's type`,
        function () {
            expect( istype('string', '') ).to.be.true;
            expect( istype('object', {}) ).to.be.true;
            expect( istype('number', 42) ).to.be.true;
            expect( istype('bigint', 42n) ).to.be.true;
            expect( istype('function', x => x) ).to.be.true;
            expect( istype('symbol', Symbol()) ).to.be.true;
            expect( istype('boolean', false) ).to.be.true;
        }
    )
})
