const union = require('../union');
const expect = require('chai').expect;

const numbers1to10 = {
    [Symbol.iterator] : function* () {
        for( const number of [1,2,3,4,5,6,7,8,9,10] ) yield number;
    }
}

describe.only('union()', function() {

    it('should be curried',
        function () {
            
            const curried = union([1,2,3]);
            expect(curried).to.be.a('function');
            expect( curried([4,5,6]) ).to.be.an('array').with.length(6);
        }
    )

    it('should return an array containing the items in the first argument followed by the items in the second argument',
        function () {
            
            let result = union( [1,2,3], [4,5,6] );
            expect( result ).to.be.deep.equal( [1,2,3,4,5,6] );

            result = union( [1,2,3], [] );
            expect( result ).to.be.deep.equal( [1,2,3] );

            result = union( [], [1,2,3] );
            expect( result ).to.be.deep.equal( [1,2,3] );
        }
    )

    it('should return an array without duplicate items',
        function () {
            
            let result = union( [1,2,3], [1,2,3] );
            expect( result ).to.be.deep.equal( [1,2,3] );

            result = union( [1,2,3], [2,3,4,5] );
            expect( result ).to.be.deep.equal( [1,2,3,4,5] );
        }
    )

    it('should work with string arguments',
        function () {
            
            const result = union( 'dante', 'le poole' );
            expect( result ).to.be.deep.equal( ['d','a','n','t','e', 'l', ' ', 'p', 'o'] );
        }
    )

    it('should work with any iterable arguments',
        function () {
            
            const result = union( [2,5,7,42], numbers1to10 );
            expect( result ).to.be.deep.equal( [2,5,7,42,1,3,4,6,8,9,10] );
        }
    )
})