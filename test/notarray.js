const expect = require('chai').expect;
const notarray = require('../src/notarray');

describe(`notarray()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if the argument is a Javascript native Array`,
        function () {
            expect( notarray([]) ).to.be.false;
            expect( notarray(new Array()) ).to.be.false;
            expect( notarray(Array.from([])) ).to.be.false;
        }
    )

    it(`should return true if the argument is not a Javascript native Array`,
        function () {
            expect( notarray() ).to.be.true;
            expect( notarray(null) ).to.be.true;
            expect( notarray({}) ).to.be.true;
            expect( notarray(notarray) ).to.be.true;
            expect( notarray(NaN) ).to.be.true;
            expect( notarray(42) ).to.be.true;
            expect( notarray('foobar') ).to.be.true;
            expect( notarray(42n) ).to.be.true;
            expect( notarray(false) ).to.be.true;
            expect( notarray(Symbol) ).to.be.true;
        }
    )
})
