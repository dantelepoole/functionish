const union = require('../union');
const expect = require('chai').expect;
const isiterable = require('../isiterable');

const listnumbers1to10 = {
    [Symbol.iterator] : function* () {
        for( const number of [1,2,3,4,5,6,7,8,9,10] ) yield number;
    }
}

function array(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

describe('union()', function() {

    it('should be curried',
        function () {
            
            const curried = union([1,2,3]);
            expect(curried).to.be.a('function');
            expect( array(curried([4,5,6])) ).to.be.an('array').with.length(6);
        }
    )

    it('should return an iterable producing the items in the first list followed by the items in the second list',
        function () {
            
            let result = union( [1,2,3], [4,5,6] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,4,5,6] );

            result = union( [1,2,3], [] );
            expect( array(result) ).to.be.deep.equal( [1,2,3] );

            result = union( [], [1,2,3] );
            expect( array(result) ).to.be.deep.equal( [1,2,3] );
        }
    )

    it('should return an iterable that produces only unique items',
        function () {
            
            let result = union( [1,2,3], [1,2,3] );
            expect( array(result) ).to.be.deep.equal( [1,2,3] );

            result = union( [1,2,3], [2,3,4,5] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,4,5] );
        }
    )

    it('should work with any iterable objects',
        function () {
            
            const result = union( [2,5,7,42], listnumbers1to10 );
            expect( array(result) ).to.be.deep.equal( [2,5,7,42,1,3,4,6,8,9,10] );
        }
    )
})