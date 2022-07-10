const expect = require('chai').expect;
const lift = require('../src/lift');

describe(`lift()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return an array containing its argument is its only item`,
        function () {
        
            expect( lift(42) ).to.deep.equal( [42] );
            expect( lift([]) ).to.deep.equal( [[]] );

        }
    )

    it(`should return an empty array if its argument is undefined`,
        function () {
        
            expect( lift(undefined) ).to.deep.equal( [] );
            expect( lift() ).to.deep.equal( [] );
        }
    )
})
