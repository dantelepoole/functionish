const expect = require('chai').expect;
const isstring = require('../src/isstring');

describe(`isstring()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type string`,
        function () {
            expect( isstring('foobar') ).to.be.true;
            expect( isstring( String(1) ) ).to.be.true;
            expect( isstring( {}.toString() ) ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( isstring(1) ).to.be.false;
            expect( isstring(null) ).to.be.false;
            expect( isstring(undefined) ).to.be.false;
            expect( isstring({}) ).to.be.false;
            expect( isstring([]) ).to.be.false;
            expect( isstring( ()=>{} ) ).to.be.false;
            expect( isstring(Symbol) ).to.be.false;
            expect( isstring(true) ).to.be.false;
        }
    )

})
