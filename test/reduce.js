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

    it(`should pass reducable and the initialvalue to the reducer's reduce() method, if it has one`,
        function () {
            const reducable = spyreducable([1,2,3]);
            const result = reduce(sum, 0, reducable);
            expect(result).to.be.equal(6);
            expect(reducable.reduce.callCount).to.equal(1);
            expect(sum.callCount).to.equal(3);
        }
    )

    it(`should reduce the items produced by the reducable if it has no reduce() method but it is iterable`,
        function() {
            const result = reduce(sum, 0, range(3));
            expect(result).to.be.equal(6);
            expect(sum.callCount).to.equal(3);
        }
    )

    it(`should throw if the reducable has no reduce() method and is not iterable`,
        function () {
            expect( ()=>reduce(sum, 0, {}) ).to.throw();
        }
    )

    it(`should throw if the reducer is not a function`,
        function () {
            expect( ()=>reduce({}, 0, [1,2,3]) ).to.throw();
        }
    )

    it(`should ensure the reducer is always called with exacty two arguments`,
        function () {
            const countargs = spy(
                function(...args) {
                    expect(args.length).to.equal(2);
                    return args.length;
                }
            )
            const result = reduce(countargs, 0, [1,2,3,4]);
            expect(result).to.be.equal(2);

            for(const args of countargs.args) expect(args.length).to.equal(2);
        }
    )
})