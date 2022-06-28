const expect = require('chai').expect;
const isobject = require('../isobject');

describe(`isobject()`, function() {

    beforeEach(
        function() {

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
            expect( isobject() ).to.be.false;
            expect( isobject(null) ).to.be.false;
            expect( isobject( 'foobar' ) ).to.be.false;
            expect( isobject( 42 ) ).to.be.false;
            expect( isobject( 42n ) ).to.be.false;
            expect( isobject( true ) ).to.be.false;
            expect( isobject( false ) ).to.be.false;
            expect( isobject( Symbol ) ).to.be.false;
            expect( isobject( isobject ) ).to.be.false;
            expect( isobject( class Foobar {} ) ).to.be.false;
        }
    )

    it(`should return false if its argument is null`,
        function () {
            expect( isobject(null) ).to.be.false;
        }
    )

})
