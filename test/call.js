const call = require('../src/call');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

function sum(...numbers) { return numbers.reduce( (a,b) => (a+b), 0 ) }

describe('call()', function() {

    beforeEach(
        function() {
        }
    )

    it('should pass the args to the function and return the result',
        function() {
            expect( call(sum, ...numbers1to10) ).to.be.equal(55);
        }
    )

    it('should throw if its first argument is not a function',
        function () {
            expect( () => call(42, numbers1to10) ).to.throw();
        }
    )

})