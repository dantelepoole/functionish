const expect = require('chai').expect;
const ispromise = require('../src/types/ispromise');

describe(`ispromise()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( ispromise() ).to.be.false;
        }
    )

    it(`should return true if its argument is a Javascript native Promise instance`,
        function () {
            expect( ispromise( Promise.resolve(42) ) ).to.be.true;
            expect( ispromise( Promise.reject( new Error() ) ) ).to.be.true;
        }
    )

    it(`should return false if its argument is not a Javascript native Promise instance`,
        function () {
            expect( ispromise(null) ).to.be.false;
            expect( ispromise({}) ).to.be.false;
            expect( ispromise([]) ).to.be.false;
            expect( ispromise('promise') ).to.be.false;
            expect( ispromise(42) ).to.be.false;
            expect( ispromise(true) ).to.be.false;
            expect( ispromise(x => x) ).to.be.false;
            expect( ispromise(42n) ).to.be.false;
            expect( ispromise( Symbol() ) ).to.be.false;
        }
    )
})
