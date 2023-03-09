const expect = require('chai').expect;
const isobject = require('../src/types/isobject');

describe(`isobject()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isobject(null) ).to.be.false;
        }
    )

    it(`should return false if its argument is null`,
        function () {
            expect( isobject(null) ).to.be.false;
        }
    )

    it(`should return true if its argument has type object`,
        function () {
            expect( isobject([]) ).to.be.true;
            expect( isobject({}) ).to.be.true;
            expect( isobject( Object.create(null) ) ).to.be.true;
            expect( isobject( Object('foobar') ) ).to.be.true;
            expect( isobject( Object(1) ) ).to.be.true;
        }
    )

    it(`should return false if its argument has type other than object`,
        function () {
            expect( isobject( 'object' ) ).to.be.false;
            expect( isobject( 42 ) ).to.be.false;
            expect( isobject( 42n ) ).to.be.false;
            expect( isobject( true ) ).to.be.false;
            expect( isobject( Symbol() ) ).to.be.false;
            expect( isobject( x => x ) ).to.be.false;
        }
    )

})
