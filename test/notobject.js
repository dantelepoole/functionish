const expect = require('chai').expect;
const notobject = require('../src/notobject');

describe(`notobject()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type object`,
        function () {
            expect( notobject([]) ).to.be.false;
            expect( notobject({}) ).to.be.false;
            expect( notobject( Object.create(null) ) ).to.be.false;
            expect( notobject( Object('foobar') ) ).to.be.false;
            expect( notobject( Object(1) ) ).to.be.false;
        }
    )

    it(`should return true if its argument has type other than object`,
        function () {
            expect( notobject() ).to.be.true;
            expect( notobject(null) ).to.be.true;
            expect( notobject( 'foobar' ) ).to.be.true;
            expect( notobject( 42 ) ).to.be.true;
            expect( notobject( 42n ) ).to.be.true;
            expect( notobject( true ) ).to.be.true;
            expect( notobject( false ) ).to.be.true;
            expect( notobject( Symbol ) ).to.be.true;
            expect( notobject( notobject ) ).to.be.true;
            expect( notobject( class Foobar {} ) ).to.be.true;
        }
    )

    it(`should return true if its argument is null`,
        function () {
            expect( notobject(null) ).to.be.true;
        }
    )

})
