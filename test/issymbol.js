const expect = require('chai').expect;
const issymbol = require('../issymbol');

describe(`issymbol()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type symbol`,
        function () {
            expect( issymbol( Symbol() ) ).to.be.true;
            expect( issymbol( Symbol.for('foobar') ) ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( issymbol(null) ).to.be.false;
            expect( issymbol(undefined) ).to.be.false;
            expect( issymbol({}) ).to.be.false;
            expect( issymbol([]) ).to.be.false;
            expect( issymbol(42) ).to.be.false;
            expect( issymbol('foobar') ).to.be.false;
            expect( issymbol(true) ).to.be.false;
        }
    )
})
