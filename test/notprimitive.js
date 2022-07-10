const expect = require('chai').expect;
const notprimitive = require('../src/notprimitive');

describe(`notprimitive()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is null, undefined, a boolean, a string, a number, a symbol or a bigint`,
        function () {
            expect( notprimitive(null) ).to.be.false;
            expect( notprimitive(undefined) ).to.be.false;
            expect( notprimitive(false) ).to.be.false;
            expect( notprimitive('foobar') ).to.be.false;
            expect( notprimitive(42) ).to.be.false;
            expect( notprimitive(Symbol()) ).to.be.false;
            expect( notprimitive(42n) ).to.be.false;
        }
    )

    it(`should return true has type object or function`,
        function () {
            expect( notprimitive({}) ).to.be.true;
            expect( notprimitive([]) ).to.be.true;
            expect( notprimitive( ()=>{} ) ).to.be.true;
            expect( notprimitive( class Foobar {} ) ).to.be.true;
            expect( notprimitive( new Date() ) ).to.be.true;
        }
    )
})
