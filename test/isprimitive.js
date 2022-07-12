const expect = require('chai').expect;
const isprimitive = require('../isprimitive');

describe(`isprimitive()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument is null, undefined, a boolean, a string, a number, a symbol or a bigint`,
        function () {
            expect( isprimitive(null) ).to.be.true;
            expect( isprimitive(undefined) ).to.be.true;
            expect( isprimitive(false) ).to.be.true;
            expect( isprimitive('foobar') ).to.be.true;
            expect( isprimitive(42) ).to.be.true;
            expect( isprimitive(Symbol()) ).to.be.true;
            expect( isprimitive(42n) ).to.be.true;
        }
    )

    it(`should return false has type object or function`,
        function () {
            expect( isprimitive({}) ).to.be.false;
            expect( isprimitive([]) ).to.be.false;
            expect( isprimitive( ()=>{} ) ).to.be.false;
            expect( isprimitive( class Foobar {} ) ).to.be.false;
            expect( isprimitive( new Date() ) ).to.be.false;
        }
    )
})
