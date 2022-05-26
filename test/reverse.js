const expect = require('chai').expect;
const reverse = require('../reverse');

const isiterable = require('../isiterable');

describe(`reverse()`, function() {

    it(`should return an iterable producing the argument's items in reverse order`,
        function () {
            const reversed = reverse([1,2,3]);
            expect( isiterable(reversed) ).to.be.true;
            expect( Array.from(reversed) ).to.be.deep.equal([3,2,1]);
        }
    )

    it(`should not change the (order of the) items in the argument`,
        function () {
            const numbers1to3 = [1,2,3];
            reverse(numbers1to3);
            expect(numbers1to3).to.be.deep.equal([1,2,3]);
        }
    )
})