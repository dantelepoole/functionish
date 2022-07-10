const attempt = require('../src/attempt');
const expect = require('chai').expect;
const sandbox = require('sinon').createSandbox();

const spy = sandbox.spy.bind(sandbox);

const returnargs = spy(
    function returnargs(...args) {
        return args;
    }
)

const raise = spy(
    function raise(...args) {
        throw new Error('raise()');
    }
)

function onerrorfactory(errorname, errorargs) {

    const onerror = spy(

        function onerror(error, args) {
            expect(arguments.length).to.be.equal(2);
            expect(args).to.be.an('array');
            if(errorargs !== undefined) expect(args).to.be.deep.equal(errorargs);
            if(errorname !== undefined) expect(error?.name).to.be.equal(errorname);

            return { error, args }
        }
    )

    return onerror;
}

describe('attempt()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return the function's return value if it does not throw`,
        function() {

            const errorhandler = onerrorfactory();

            expect( attempt(errorhandler, returnargs, 1,2,3) ).to.be.deep.equal([1,2,3]);
            expect( errorhandler.callCount ).to.be.equal(0);
            expect( returnargs.callCount ).to.be.equal(1);
        }
    )

    it(`should, if the function throws, invoke the errorhandler with the error and the function's arguments`,
        function() {

            const errorhandler = onerrorfactory();
            attempt(errorhandler, raise);
            expect(errorhandler.callCount).to.be.equal(1);
        }
    )
    
    it(`should return the errorhandler if the function throws and the errorhandler is not a function`,
        function() {

            const errorvalue = {}
            expect( attempt(errorvalue, raise) ).to.be.equal(errorvalue);
            expect(raise.callCount).to.be.equal(1);
        }
    )

    it(`should return the errorhandler's return value if it is invoked`,
        function() {

            const sentinel = {};
            const errorhandler = onerrorfactory('Error', [42,sentinel,null]);

            const result = attempt(errorhandler, raise, 42, sentinel, null);
            
            expect(result).to.be.an('object');
            expect(result.error).to.be.an('Error');
            expect(result.error.name).to.be.equal('Error');
            expect(result.error.message).to.be.equal('raise()');
            expect(result.args).to.be.deep.equal([42,sentinel,null]);
            expect(errorhandler.callCount).to.be.equal(1);
            expect(raise.callCount).to.be.equal(1);
        }
    )
})