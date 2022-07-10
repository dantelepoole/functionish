const expect = require('chai').expect;
const reverse = require('../src/reverse');

const isiterable = require('../src/isiterable');

describe(`reverse()`, function() {

    it(`should return an iterable producing the list's items in reverse order`,
        function () {
            const reversed = reverse([1,2,3]);
            expect( isiterable(reversed) ).to.be.true;
            expect( Array.from(reversed) ).to.be.deep.equal([3,2,1]);
        }
    )

    it(`should not change the (order of the) items in the list itself`,
        function () {
            const numbers1to3 = [1,2,3];
            reverse(numbers1to3);
            expect(numbers1to3).to.be.deep.equal([1,2,3]);
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>reverse({}) ).to.throw();
            expect( ()=>reverse('foobar') ).to.throw();
            expect( ()=>reverse() ).to.throw();
        }
    )

})