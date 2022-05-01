const expect = require('chai').expect;
const reduce = require('../reduce');

let invocationcount = 0;

function sum(a,b) {
    invocationcount += 1;
    return (a+b);
}

describe(`reduce()`, function() {

    beforeEach(
        function() {
            invocationcount = 0;
        }
    )

    it(`should be curried with ternary arity`,
        function () {
            let curried = reduce(sum);
            expect(curried).to.be.a('function');

            curried = curried(0);
            expect(curried).to.be.a('function');

            const result = curried([1,2,3]);
            expect(result).to.be.equal(6);
        }
    )

    it(`should pass its first two arguments to the reduce() method of its third argument`,
        function () {
            const reducable = {
                reduce(reducer, initialvalue) {
                    return reducer(initialvalue, 1);
                }
            }
            const result = reduce(sum, 42, reducable);
            expect(result).to.be.equal(43);
            expect(invocationcount).to.be.equal(1);
        }
    )

    it(`should throw if its third argument has no reduce() method`,
        function () {
            expect( () => reduce(sum, 0, {}) ).to.throw();
        }
    )

    it(`should ensure its first argument is only ever passed exactly two arguments`,
        function () {
            function countargs() {
                invocationcount += 1;
                expect(arguments.length).to.be.equal(2);
                return arguments.length;
            }
            const result = reduce(countargs, 0, [1,2,3,4]);
            expect(result).to.be.equal(2);
            expect(invocationcount).to.be.equal(4);
        }
    )
})