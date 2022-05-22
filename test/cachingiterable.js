const expect = require('chai').expect;
const cachingiterable = require('../lib/cachingiterable');
const isiterable = require('../isiterable');

function toarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

describe('cachingiterable()', function() {

    it("should return an iterable that produces the its arguments' items in order",
        function () {
            expect( toarray(cachingiterable([1,2,3])) ).to.be.deep.equal([1,2,3]);
        }
    )

    it('should return a repeatable iterable that never changes even if its argument iterable does',
        function () {
            
            const array = [1,2,3];
            const arraycopy = array.slice();

            const iterable = cachingiterable(array);

            expect( toarray(iterable) ).to.be.deep.equal(arraycopy);
            array.length = 0;
            expect( toarray(iterable) ).to.be.deep.equal(arraycopy);
        }
    )

    it('should return an iterable with a `clearcache()` method which clears its cache',
        function () {
            const array = [1,2,3];

            const iterable = cachingiterable(array);

            expect( toarray(iterable) ).to.be.deep.equal([1,2,3]);
            array.length = 0;
            expect( toarray(iterable) ).to.be.deep.equal([1,2,3]);
            iterable.clearcache();
            expect( toarray(iterable) ).to.be.deep.equal([]);
            array.push(3,2,1);
            expect( toarray(iterable) ).to.be.deep.equal([]);
            iterable.clearcache();
            expect( toarray(iterable) ).to.be.deep.equal(array);
            array.push(6,7,8);
            expect( toarray(iterable) ).to.be.deep.equal([3,2,1]);
            expect( array ).to.be.deep.equal([3,2,1,6,7,8]);

        }
    )

    it('should work with any iterable argument',
        function () {
            expect( toarray(cachingiterable('foobar')) ).to.be.deep.equal(['f','o','o','b','a','r']);
        }
    )
})