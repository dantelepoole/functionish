const batch = require('../batch');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

describe('batch()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return a two-dimensional array (i.e. array of batches)',
        function () {
            let result = batch(5, numbers1to10);
            expect(result).to.be.an('array');
            expect(result[0]).to.be.an('array');
            expect(result[1]).to.be.an('array');
        }
    )

    it('should return batches with a length matching the batchsize argument, except possibly the last batch',
        function () {
            let result = batch(4, numbers1to10);
            expect(result).to.be.an('array');
            expect(result[0]).to.be.an('array').with.lengthOf(4);
            expect(result[1]).to.be.an('array').with.lengthOf(4);
            expect(result[2]).to.be.an('array').with.lengthOf(2);
        }
    )

    it('should return batches with a combined length equal to the length of its second argument',
        function () {
            let result = batch(5, numbers1to10);
            expect(result).to.be.an('array');
            expect(result[0]).to.be.an('array').with.lengthOf(5);
            expect(result[1]).to.be.an('array').with.lengthOf(5);

            result = batch(4, numbers1to10);
            expect(result).to.be.an('array');
            expect(result[0]).to.be.an('array').with.lengthOf(4);
            expect(result[1]).to.be.an('array').with.lengthOf(4);
            expect(result[2]).to.be.an('array').with.lengthOf(2);

            result = batch(1, numbers1to10);
            expect(result).to.be.an('array').with.lengthOf(10);
            for( let index = 0; index < result.length; index++ ) {
                expect(result[index]).to.be.an('array').with.lengthOf(1);
            }
        }
    )

    it('should coerce the batchsize argument to a minimum value of 1',
        function () {
            let result = batch(0, numbers1to10);
            expect(result).to.be.an('array').with.lengthOf(10);
        }
    )

    it('should return a single empty batch if its batchsize argument is not a number',
        function () {
            let result = batch('foobar', numbers1to10);
            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result[0]).to.be.an('array').with.lengthOf(0);
        }
    )

    it('should return a single empty batch if its second argument is not indexable (e.g. an array)',
        function () {
            let result = batch(5, 42);
            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result[0]).to.be.an('array').with.lengthOf(0);
        }
    )

    it('should return a single batch if its batchsize argument is larger than the length of the second argument',
        function () {
            let result = batch(20, numbers1to10);
            expect(result).to.be.an('array').with.lengthOf(1);
            expect(result[0]).to.be.an('array').with.lengthOf(10);
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = batch(5);
            expect(result).to.be.a('function');
            
            result = result(numbers1to10)
            expect(result).to.be.an('array').with.lengthOf(2);
        }
    )
})