const expect = require('chai').expect;
const evaluate = require('../evaluate');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const countargs = spy( (...args) => args.length );
const returnargs = spy( (...args) => args );

const sentinel = Object.freeze({});
const symbol = Symbol.for('functionish/evaluate/test');

describe(`evaluate()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return the expression itself if it is not a function`,
        function () {
            expect( evaluate(42) ).to.equal(42);
            expect( evaluate(sentinel) ).to.equal(sentinel);
            expect( evaluate(false), false );
            expect( evaluate('foobar') ).to.equal('foobar');
            expect( evaluate(42n) ).to.equal(42n);
            expect( evaluate(null) ).to.be.null;
            expect( evaluate(undefined) ).to.be.undefined;
            expect( evaluate(symbol) ).to.equal(symbol);
            expect( evaluate(NaN) ).to.be.NaN;
        }
    )

    it(`should invoke the expression if it is a function`,
        function () {
            expect( evaluate(countargs) ).to.equal(0);
            expect( countargs.called ).to.be.true;

            expect( evaluate(returnargs) ).to.deep.equal([]);
            expect( returnargs.called ).to.be.true;
        }
    )

    it(`should pass the args to the expression if it is a function`,
        function () {
            expect( evaluate(returnargs, 1,2,3) ).to.be.deep.equal([1,2,3]);
            expect( returnargs.calledWith(1,2,3) ).to.be.true;
        }
    )
})
