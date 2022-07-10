const expect = require('chai').expect;
const repeat = require('../src/repeat');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const returnargs = spy(
    function returnargs(...args) {
        return args;
    }
)

describe(`repeat()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should throw if the function is not a function`,
        function () {
            expect( ()=>repeat(42, {})).to.throw();
        }
    )

    it(`should throw if the count is not a number`,
        function () {
            expect( ()=>repeat('foobar', {})).to.throw();
        }
    )

    it(`should call the function the specified number of times`,
        function () {
            repeat(42, returnargs);
            expect(returnargs.callCount).to.equal(42);
        }
    )

    it(`should pass its third and further arguments to the function on each invocation`,
        function () {
            const checkargs = spy(
                function checkargs(...args) {
                    expect(args).to.deep.equal([1,2,3]);
                }
            )
            repeat(5, checkargs, 1,2,3);
            expect(checkargs.callCount).to.equal(5);
        }
    )

    it(`should not call the function if the count is less than 1 or NaN`,
        function () {
            repeat(-1, returnargs);
            expect(returnargs.callCount).to.equal(0);
            repeat(0, returnargs);
            expect(returnargs.callCount).to.equal(0);
            repeat(NaN, returnargs);
            expect(returnargs.callCount).to.equal(0);
        }
    )

    it(`should pass it's this-object to the target function on each invocation`,
        function () {
            const that = {};
            const checkthis = spy(
                function checkthis() {
                    expect(this).to.equal(that);
                }
            )
            repeat.call(that, 5, checkthis);
            expect(checkthis.callCount).to.equal(5);
        }
    )
})