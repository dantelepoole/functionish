const at = require('../at');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

describe('at()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return the item of its second argument at the index passed as its first argument',
        function () {
            let result = at(0, numbers1to10);
            expect(result).to.be.equal(1);

            result = at(9, numbers1to10);
            expect(result).to.be.equal(10);
        }
    )

    it('should return undefined if its index argument is higher than the highest index in its second arguments',
        function () {
            let result = at(10, numbers1to10);
            expect(result).to.be.undefined;
        }
    )

    it('should retrieve the item counting down from the end of its second argument of the index is negative',
        function () {
            let result = at(-1, numbers1to10);
            expect(result).to.be.equal(10);
            result = at(-10, numbers1to10);
            expect(result).to.be.equal(1);
 
        }
    )

    it('should return the keyed property of the second argument if its first argument is not a number',
        function () {
            let result = at('length', numbers1to10);
            expect(result).to.be.equal(10);
        }
    )

    it('should return undefined if its second argument is not indexable (e.g. an array)',
        function () {
            let result = at(3, 42);
            expect(result).to.be.undefined;
        }
    )

    it('should return undefined if its second argument is not iterable',
        function () {
            let result = at(0, 42)
            expect( result ).to.be.undefined;
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = at(0);
            expect(result).to.be.a('function');
            result = result(numbers1to10)
            expect(result).to.be.equal(1);
        }
    )
})