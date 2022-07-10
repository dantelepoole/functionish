const expect = require('chai').expect;
const symdiff = require('../src/symdiff');
const isiterable = require('../src/isiterable');

function array(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

describe(`symdiff()`, function() {

    it(`should be curried`,
        function () {
            const curried = symdiff([1,2,3]);
            expect(curried).to.be.a('function');

            const result = curried([3,4,5]);
            expect( isiterable(result) ).to.be.true;
            expect( result ).not.to.be.an('array');
        }
    )

    it(`should return an empty iterable if both lists contain the same items`,
        function () {

            const result = symdiff( [1,2,3], [1,2,3] );
            expect( array(result) ).to.be.an('array').with.length(0);

        }
    )

    it(`should throw if either list is not iterable`,
        function () {
            expect( ()=>symdiff({},[1,2,3]) ).to.throw();
            expect( ()=>symdiff([1,2,3], {}) ).to.throw();
        }
    )

    it(`should return an iterable producing the items from both lists that are not present in the other list`,
        function () {
            const result = symdiff( [1,2,3,4,5], [4,5,6,7,8] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )

    it(`should, if any list is empty, return an iterable producing all items in the other list, in the same order`,
        function () {
            let result = symdiff( [1,2,3,4,5], [] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,4,5] );

            result = symdiff( [], [1,2,3,4,5] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,4,5] );
        }
    )

    it(`should return an iterable without duplicate items`,
        function () {
            const result = symdiff( [1,2,3,4,5,1,2,3], [4,5,6,7,8,6,7,8] );
            expect( array(result) ).to.be.deep.equal( [1,2,3,6,7,8] );
        }
    )
})