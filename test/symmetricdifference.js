const expect = require('chai').expect;
const symmetricdifference = require('../symmetricdifference');
const isiterable = require('../isiterable');

function toarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

function iteratorfactory(...items) {

    return {
        [Symbol.iterator] : function*() {
            yield* items;
        }
    }

}

describe(`symmetricdifference()`, function() {

    it(`should be curried`,
        function () {
            const curried = symmetricdifference([1,2,3]);
            expect(curried).to.be.a('function');

            const result = curried([3,4,5]);
            expect( isiterable(result) ).to.be.true;
            expect( result ).not.to.be.an('array');
        }
    )

    it(`should return an empty iterable if the arguments contain the same items`,
        function () {

            const result = symmetricdifference( [1,2,3], [1,2,3] );
            expect( toarray(result) ).to.be.an('array').with.length(0);

        }
    )

    it(`should accept iterables for the arguments`,
        function () {

            const iter1 = iteratorfactory(1,2,3);
            const iter2 = iteratorfactory(2,3,4);

            const result = symmetricdifference( iter1, iter2 );
            expect( toarray(result) ).to.be.deep.equal( [1,4] );
        }
    )

    it(`should return an iterable producing the items from both arguments that are not present in the other argument`,
        function () {
            const result = symmetricdifference( [1,2,3,4,5], [4,5,6,7,8] );
            expect( toarray(result) ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )

    it(`should, if one argument is empty, return an iterable producing all items in the other array, in the same order`,
        function () {
            let result = symmetricdifference( [1,2,3,4,5], [] );
            expect( toarray(result) ).to.be.deep.equal( [1,2,3,4,5] );

            result = symmetricdifference( [], [1,2,3,4,5] );
            expect( toarray(result) ).to.be.deep.equal( [1,2,3,4,5] );
        }
    )

    it(`should return an iterable without duplicate items`,
        function () {
            const result = symmetricdifference( [1,2,3,4,5,1,2,3], [4,5,6,7,8,6,7,8] );
            expect( toarray(result) ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )
})