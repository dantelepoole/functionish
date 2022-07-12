const expect = require('chai').expect;
const notsymbol = require('../notsymbol');

describe(`notsymbol()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type symbol`,
        function () {
            expect( notsymbol( Symbol() ) ).to.be.false;
            expect( notsymbol( Symbol.for('foobar') ) ).to.be.false;
        }
    )

    it(`should return true if its argument has any other type`,
        function () {
            expect( notsymbol(null) ).to.be.true;
            expect( notsymbol(undefined) ).to.be.true;
            expect( notsymbol({}) ).to.be.true;
            expect( notsymbol([]) ).to.be.true;
            expect( notsymbol(42) ).to.be.true;
            expect( notsymbol('foobar') ).to.be.true;
            expect( notsymbol(true) ).to.be.true;
        }
    )
})
