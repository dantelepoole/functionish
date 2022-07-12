const expect = require('chai').expect;
const length = require('../length');

describe(`length()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the value of the length-property of its argument`,
        function () {
            expect( length([]) ).to.equal( 0 );
            expect( length([1,2,3]) ).to.equal( 3 );
            expect( length('') ).to.equal( 0 );
            expect( length('foobar') ).to.equal( 6 );
            expect( length( {length:42} ) ).to.equal( 42 );
            expect( length( {length:'foobar'} ) ).to.equal( 'foobar' );
        }
    )

    it(`should return undefined if its argument has no length-property`,
        function () {
            expect( length({}) ).to.be.undefined;
            expect( length(true) ).to.be.undefined;
            expect( length(42) ).to.be.undefined;
            expect( length( new Map() ) ).to.be.undefined;
            expect( length( new Set() ) ).to.be.undefined;
        }
    )

    it(`should return undefined if its argument is null or undefined`,
        function () {
            expect( length(null) ).to.be.undefined;
            expect( length(undefined) ).to.be.undefined;
            expect( length() ).to.be.undefined;
        }
    )
})
