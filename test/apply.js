const apply = require('../src/apply');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

function sum(...numbers) { return numbers.reduce( (a,b) => (a+b), 0 ) }
function countargs(...args) { return args.length };

describe('apply()', function() {

    beforeEach(
        function() {
        }
    )

    it('should pass the args array to the function and return the result',
        function() {
            expect( apply(sum, numbers1to10) ).to.be.equal(55);
        }
    )

    it('should throw if the target function is not a function',
        function () {
            expect( () => apply(42, numbers1to10) ).to.throw();
        }
    )

    it('should be curried',
        function () {

            const curried = apply(sum);
            expect(curried).to.be.a('function');
            expect( curried(numbers1to10) ).to.be.equal(55);
        }
    )

})