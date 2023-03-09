const uniq = require('../uniq');
const expect = require('chai').expect;
const isiterable = require('../isiterable');

function uniqarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from( uniq(iterable) );
}

function iterablefactory(items) {

    return {
        [Symbol.iterator]: function* () {
            for( const item of items ) yield item;
        }
    }
}

describe('uniq()', function() {

    it('should return an iterable producing all items in the argument in order but without duplicates',
        function () {
            expect( uniqarray( [1,2,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniqarray( [1,2,1,2,3,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniqarray( [3,3,2,2,1,1] ) ).to.be.deep.equal( [3,2,1] );
            expect( uniqarray( [1,2,3,1,2,3] ) ).to.be.deep.equal( [1,2,3] );
            expect( uniqarray( ['a','b','a','c','b'] ) ).to.be.deep.equal( ['a','b','c'] );
        }
    )

    it('should work with iterable objects',
        function () {
            expect( uniqarray( iterablefactory([1,1,2,2,3,3]) ) ).to.be.deep.equal([1,2,3]);
        }
    )
})