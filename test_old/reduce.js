const expect = require('chai').expect;
const range = require('../range');
const reduce = require('../reduce');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(a,b) {
        return (a+b);
    }
)

function spyreducable(reducable) {

    const object = {
        reduce: reducable.reduce.bind(reducable)
    }

    spy(object, 'reduce');

    return object;
}

describe(`reduce()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried with ternary arity`,
        function () {
            let curried = reduce(sum);
            expect(curried).to.be.a('function');

            curried = curried(0);
            expect(curried).to.be.a('function');

            const result = curried([1,2,3]);
            expect(result).not.to.be.a('function');
            expect(result).to.be.equal(6);
        }
    )

    it(`should reduce the list's values`,
        function() {
            const result = reduce(sum, 0, range(3));
            expect(result).to.be.equal(6);
            expect(sum.callCount).to.equal(3);
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>reduce(sum, 0, {}) ).to.throw();
        }
    )

    it(`should throw if the reducer is not a function`,
        function () {
            expect( ()=>reduce({}, 0, [1,2,3]) ).to.throw();
        }
    )

})