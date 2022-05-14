const expect = require('chai').expect;
const reverse = require('../reverse');

describe(`reverse()`, function() {

    it(`should return an array with the items in its argument array in reverse order`,
        function () {
            const reversed = reverse([1,2,3]);
            expect(reversed).to.be.deep.equal([3,2,1]);
        }
    )

    it(`should not change its argument array`,
        function () {
            const numbers1to3 = [1,2,3];
            reverse(numbers1to3);
            expect(numbers1to3).to.be.deep.equal([1,2,3]);
        }
    )

    it(`should not affect the items in the argument array`,
        function () {
            const markerobject = {};
            const markersymbol = Symbol('foobar');
            const markerarray = [markerobject, markersymbol];
            const list = [markerobject, markerarray, 42, markersymbol];
            const reversed = reverse(list);
            expect(reversed[0]).to.be.equal(markersymbol);
            expect(reversed[1]).to.be.equal(42);
            expect(reversed[2]).to.be.equal(markerarray);
            expect(reversed[3]).to.be.equal(markerobject);
        }
    )
})