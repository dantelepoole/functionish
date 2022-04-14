const applicable = require('../applicable');
const expect = require('chai').expect;

function sum(...numbers) {
    return numbers.reduce( (a,b) => (a+b), 0);
}

describe('applicable()', function() {

    beforeEach(
        function() {
        }
    )

    it('should return a function',
        function() {
            expect( applicable(1,2,3) ).to.be.a('function');
        }
    )

    it('should apply the first argument to its returned function to its initial arguments and return the result',
        function() {
            const applicable_123 = applicable(1,2,3);
            const result = applicable_123(sum);
            expect(result).to.be.equal(6);
        }
    )

    it('should pass on any additional arguments passed to its returned function',
        function() {
            const applicable_123 = applicable(1,2,3);
            const result = applicable_123(sum,4,5,6);
            expect(result).to.be.equal(21);
        }
    )

    it('should throw if the first argument to its returned function is not a function',
        function() {
            expect( ()=>applicable(1)(2) ).to.throw;
        }
    )

    it('should work if it receives no arguments',
        function() {
            const result = applicable()(sum);
            expect( result ).to.be.equal(0);
        }
    )
})