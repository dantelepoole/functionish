const at = require('../at');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

describe('at()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return the item at the specified index of the list',
        function () {
            let result = at(numbers1to10, 0);
            expect(result).to.be.equal(1);

            result = at(numbers1to10, 9);
            expect(result).to.be.equal(10);
        }
    )

    it('should return undefined if the index is higher than the highest index in the list',
        function () {
            let result = at(numbers1to10, 10);
            expect(result).to.be.undefined;
        }
    )

    it('should retrieve the item counting down from the end of the list if the index is negative',
        function () {
            let result = at(numbers1to10, -1);
            expect(result).to.be.equal(10);
            result = at(numbers1to10, -10);
            expect(result).to.be.equal(1);
 
        }
    )

    it('should return undefined if the list is not indexable',
        function () {
            let result = at({}, 3);
            expect(result).to.be.undefined;
        }
    )

    it('should throw if the index is not a number',
        function () {
            expect( ()=>at([1,2,3], 'foobar') ).to.throw();
        }
    )

})