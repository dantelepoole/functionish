const expect = require('chai').expect;
const notstring = require('../notstring');

describe(`notstring()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type string`,
        function () {
            expect( notstring('foobar') ).to.be.false;
            expect( notstring( String(1) ) ).to.be.false;
            expect( notstring( {}.toString() ) ).to.be.false;
        }
    )

    it(`should return true if its argument has any other type`,
        function () {
            expect( notstring(1) ).to.be.true;
            expect( notstring(null) ).to.be.true;
            expect( notstring(undefined) ).to.be.true;
            expect( notstring({}) ).to.be.true;
            expect( notstring([]) ).to.be.true;
            expect( notstring( ()=>{} ) ).to.be.true;
            expect( notstring(Symbol) ).to.be.true;
            expect( notstring(true) ).to.be.true;
        }
    )

})
