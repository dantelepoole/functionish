const apply = require('../apply');
const expect = require('chai').expect;

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

function sum(...numbers) { return numbers.reduce( (a,b) => (a+b), 0 ) }
function countargs(...args) { return args.length };

describe('apply()', function() {

    beforeEach(
        function() {
        }
    )

    it('should apply its first argument to its second argument and return the result',
        function() {
            expect( apply(sum, numbers1to10) ).to.be.equal(55);
        }
    )

    it('should pass its second argument as a spread parameter',
        function () {
            let argcount = apply(countargs, numbers1to10);
            expect( argcount ).to.be.equal(10);

            argcount = apply(countargs, [1,2,3]);
            expect( argcount ).to.be.equal(3);

            argcount = apply(countargs, []);
            expect( argcount ).to.be.equal(0);
        }
    )

    it('should throw if its first argument is not a function',
        function () {
            expect( () => apply(42, numbers1to10) ).to.throw();
        }
    )

    it('should throw if its second argument is not iterable',
        function () {
            expect( () => apply(countargs, 42) ).to.throw();
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = apply(sum);
            expect(result).to.be.a('function');
            result = result(numbers1to10)
            expect(result).to.be.equal(55);
        }
    )
})