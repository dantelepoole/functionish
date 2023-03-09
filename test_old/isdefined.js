const expect = require('chai').expect;
const isdefined = require('../src/types/isdefined');

describe(`isdefined()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isdefined() ).to.be.false;
        }
    )

    it(`should return false if its argument is null, undefined or NaN`,
        function () {
            expect( isdefined(null) ).to.be.false;
            expect( isdefined(undefined) ).to.be.false;
            expect( isdefined(NaN) ).to.be.false;
        }
    )

    it(`should return true if its argument is any other value`,
        function () {
            expect( isdefined('foobar') ).to.be.true;
            expect( isdefined(42) ).to.be.true;
            expect( isdefined(42n) ).to.be.true;
            expect( isdefined(false) ).to.be.true;
            expect( isdefined({}) ).to.be.true;
            expect( isdefined( new Date() ) ).to.be.true;
            expect( isdefined([]) ).to.be.true;
            expect( isdefined(Symbol()) ).to.be.true;
            expect( isdefined(x => x) ).to.be.true;
        }
    )
})
