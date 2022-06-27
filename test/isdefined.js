const expect = require('chai').expect;
const isdefined = require('../isdefined');

describe(`isdefined()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is null`,
        function () {
            expect( isdefined(null) ).to.be.false;
        }
    )

    it(`should return false if its argument is undefined`,
        function () {
            expect( isdefined(undefined) ).to.be.false;
        }
    )

    it(`should return true if its argument is any other value`,
        function () {
            expect( isdefined('') ).to.be.true;
            expect( isdefined(0) ).to.be.true;
            expect( isdefined(false) ).to.be.true;
            expect( isdefined(-0) ).to.be.true;
            expect( isdefined(0.00000000001) ).to.be.true;
            expect( isdefined(0n) ).to.be.true;
            expect( isdefined({}) ).to.be.true;
            expect( isdefined([]) ).to.be.true;
            expect( isdefined(Symbol()) ).to.be.true;
            expect( isdefined( ()=>{} ) ).to.be.true;
            expect( isdefined( NaN ) ).to.be.true;
        }
    )
})
