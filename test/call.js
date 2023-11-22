const call = require('../src/call');
const expect = require('chai').expect;
const sinon = require("sinon");

const THIS = {foo:'bar'}

const collectargs = (...args) => args;
const fakecallcollectargs = sinon.replace(collectargs, 'call', sinon.fake( (that, ...args) => collectargs.apply(that, args) ) );

function isTHIS() {
    return (THIS === this);
}

describe( 'call()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecallcollectargs.resetHistory();
        })

        it(`should call the 'call()' method of the target function`, function() {
            expect(fakecallcollectargs.callCount).to.equal(0);
            call(collectargs);
            expect(fakecallcollectargs.callCount).to.equal(1);
        })

        it(`should throw if the target function is not a function`, function() {
            expect( () => call() ).to.throw();
        })

        it(`should pass its own 'this' value' as the first argument to the 'call()' method of the target function`, function() {
            const isthis = call.call(THIS, isTHIS);
            expect(isthis).to.be.true;
        })

        it(`should pass its second argument as the second argument to the 'call()' method of the target function`, function() {
            const args = ['fubar', 42, {}];
            call(collectargs, args);
            expect(fakecallcollectargs.args[0][1]).to.deep.equal(args);
        })

        it(`should return the return value of the call to the 'call()' method of the target function`, function() {
            const args = ['fubar', 42, {}];
            const retval = call(collectargs, ...args);
            expect(fakecallcollectargs.callCount).to.equal(1);
            expect(retval).to.be.deep.equal(args);
        })
    }
);
