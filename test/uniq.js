const uniq = require('../uniq');
const expect = require('chai').expect;

function iterablefactory(items) {

    return {
        [Symbol.iterator]: function* () {
            for( const item of items ) yield item;
        }
    }
}

describe('uniq()', function() {

    it('should return an array containing all items in the argument in order but without duplicates',
        function () {
            expect( uniq( [1,2,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniq( [1,2,1,2,3,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniq( [3,3,2,2,1,1] ) ).to.be.deep.equal( [3,2,1] );
            expect( uniq( [1,2,3,1,2,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniq( ['a','b','a','c','b'] ) ).to.be.deep.equal( ['a','b','c'] );
        }
    )

    it('should throw if its argument is not iterable',
        function () {
            expect( () => uniq({}) ).to.throw();
        }
    )

    it('should return an empty array if its argument is null or undefined',
        function () {
            expect( uniq(null) ).to.be.deep.equal([]);
            expect( uniq(undefined) ).to.be.deep.equal([]);
            expect( uniq() ).to.be.deep.equal([]);
        }
    )

    it('should work with strings',
        function () {
            expect( uniq('dante le poole') ).to.be.deep.equal(['d','a','n','t','e',' ','l','p','o']);
        }
    )

    it('should work with iterable objects',
        function () {
            expect( uniq( iterablefactory([1,1,2,2,3,3]) ) ).to.be.deep.equal([1,2,3]);
        }
    )
})