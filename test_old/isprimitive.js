const expect = require('chai').expect;
const isprimitive = require('../src/types/isprimitive');

describe(`isprimitive()`, function() {

    it(`should return true when called without arguments`,
        function () {
            expect( isprimitive() ).to.be.true;
        }
    )

    it(`should return true if its argument is undefined, a boolean, a string, a number, a symbol or a bigint`,
        function () {
            expect( isprimitive(undefined) ).to.be.true;
            expect( isprimitive(false) ).to.be.true;
            expect( isprimitive('foobar') ).to.be.true;
            expect( isprimitive(42) ).to.be.true;
            expect( isprimitive(Symbol()) ).to.be.true;
            expect( isprimitive(42n) ).to.be.true;
        }
    )

    it(`should return false if its argument has type object or function`,
        function () {
            expect( isprimitive({}) ).to.be.false;
            expect( isprimitive([]) ).to.be.false;
            expect( isprimitive(x => x) ).to.be.false;
            expect( isprimitive( new Date() ) ).to.be.false;
        }
    )

    it(`should return false if its argument is null`,
        function () {
            expect( isprimitive(null) ).to.be.false;
        }
    )

    it(`should return true if its argument is NaN`,
        function () {
            expect( isprimitive(NaN) ).to.be.true;
        }
    )
})
