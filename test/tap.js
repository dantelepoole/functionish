const expect = require('chai').expect;
const tap = require('../tap');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sentinel = Symbol();

const log = spy(
    function log(...args) {
        // no op
    }
)

describe(`tap()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return a function`,
        function () {
            expect( tap(log) ).to.be.a('function');
        }
    )
    
    it(`should throw if the function is not a function`,
        function () {
            expect( ()=>tap({}) ).to.throw();
            expect( ()=>tap() ).to.throw();
        }
    )

    describe(`tap()'s returned function`, function () {

        it(`should invoke the target function with its arguments`,
            function() {

                const tapped = tap(log);

                tapped(42, 'foobar', sentinel);
                
                expect( log.calledOnceWith(42, 'foobar', sentinel) ).to.be.true;
            }
        )

        it(`should return its own first argument`,
            function() {

                const tapped = tap(log);

                expect( tapped(sentinel, 42, 'foobar') ).to.equal(sentinel);
                expect( tapped(sentinel) ).to.equal(sentinel);
                expect( tapped() ).to.be.undefined;

                expect(log.callCount).to.equal(3);
            }
        )
    })
})