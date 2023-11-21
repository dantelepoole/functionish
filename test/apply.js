const apply = require('../src/apply');
const expect = require('chai').expect;
const sinon = require("sinon");

const THIS = {foo:'bar'}

const collectargs = (...args) => args;
const fakeapplycollectargs = sinon.replace(collectargs, 'apply', sinon.fake( (that, argarray) => collectargs.call(that, ...argarray) ) );

function isTHIS() {
    return (THIS === this);
}

describe( 'apply()', function() {

        beforeEach(function () {
            sinon.reset();
        })

        it(`should call the 'apply()' method of the target function`,

            function() {
                expect(fakeapplycollectargs.callCount).to.equal(0);
                apply(collectargs, []);
                expect(fakeapplycollectargs.callCount).to.equal(1);
            }
        )

        it(`should pass its own 'this' value' as the first argument to the 'apply()' method of the target function`,

            function() {
                const isthis = apply.call(THIS, isTHIS, []);
                expect(isthis).to.be.true;
            }
        )

        it(`should pass its second argument as the second argument to the 'apply()' method of the target function`,

            function() {
                const argarray = ['fubar', 42, {}];
                apply(collectargs, argarray);
                expect(fakeapplycollectargs.args[0][1]).to.deep.equal(argarray);
            }
        )

        it(`should return the return value of the call to the 'apply()' method of the target function`,

            function() {
                const argarray = ['fubar', 42, {}];
                const retval = apply(collectargs, argarray);
                expect(fakeapplycollectargs.callCount).to.equal(1);
                expect(retval).to.be.deep.equal(argarray);
            }
        )

        it(`should be curried with unary arity`,

            function() {

                const argarray = ['fubar', 42, {}];

                expect(fakeapplycollectargs.callCount).to.equal(0);
                
                const applycollectargs = apply(collectargs);
                expect(fakeapplycollectargs.callCount).to.equal(0);
                expect(applycollectargs).to.be.a('function');

                const retval = applycollectargs(argarray);
                expect(fakeapplycollectargs.callCount).to.equal(1);
                expect(retval).to.be.deep.equal(argarray);
            }
        )
    }
);
