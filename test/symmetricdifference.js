const expect = require('chai').expect;
const symmetricdifference = require('../symmetricdifference');

function iteratorfactory(...items) {

    return {
        [Symbol.iterator] : function*() {
            for(const item of items) yield item;
        }
    }

}

describe(`symmetricdifference()`, function() {

    it(`should be curried`,
        function () {
            const curried = symmetricdifference([1,2,3]);
            expect(curried).to.be.a('function');

            expect( curried( [3,4,5] ) ).to.be.an('array');
        }
    )

    it(`should return an empty array if the arguments contain the same items`,
        function () {

            const result = symmetricdifference( [1,2,3], [1,2,3] );
            expect( result ).to.be.an('array').with.length(0);
        }
    )

    it(`should accept iterables for the arguments`,
        function () {

            const iter1 = iteratorfactory(1,2,3);
            const iter2 = iteratorfactory(2,3,4);

            const result = symmetricdifference( iter1, iter2 );
            expect( result ).to.be.deep.equal( [1,4] );
        }
    )

    it(`should throw if either argument is not iterable`,
        function () {
            expect( ()=>symmetricdifference({}, []) ).to.throw();
            expect( ()=>symmetricdifference([], {}) ).to.throw();
        }
    )

    it(`should return an array holding the items from both arguments that are not present in the other argument`,
        function () {
            const result = symmetricdifference( [1,2,3,4,5], [4,5,6,7,8] );
            expect( result ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )

    it(`should, if one argument is empty, return an array holding all items in the other array, in the same order`,
        function () {
            const result = symmetricdifference( [1,2,3,4,5], [] );
            expect( result ).to.be.deep.equal( [1,2,3,4,5] );
        }
    )

    it(`should return an array without duplicate items`,
        function () {
            const result = symmetricdifference( [1,2,3,4,5,1,2,3], [4,5,6,7,8,6,7,8] );
            expect( result ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )
})