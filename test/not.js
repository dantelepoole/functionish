const expect = require('chai').expect;
const not = require('../not');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

describe(`not()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return the logical complement of the expression if it is not a function`,
        function () {

            expect( not(true) ).to.be.false;
            expect( not([]) ).to.be.false;
            expect( not({}) ).to.be.false;
            expect( not(42) ).to.be.false;
            expect( not(42n) ).to.be.false;
            
            expect( not(false) ).to.be.true;
            expect( not(null) ).to.be.true;
            expect( not(undefined) ).to.be.true;
            expect( not(NaN) ).to.be.true;
            expect( not(0) ).to.be.true;
            expect( not(-0) ).to.be.true;
        }
    )

    it(`should return a function if the expression is a function`,
        function () {
            expect( not(iseven) ).to.be.a('function');
        }
    )

    describe(`the function returned by not()`, function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it(`return pass the arguments to the target function`,
            function () {
                const isodd = not(iseven);
                isodd(42);

                expect(iseven.calledOnceWith(42)).to.be.true;
            }
        )

        it(`return the logical complement of the target function's return value`,
            function () {
                const isodd = not(iseven);

                expect( isodd(42) ).to.equal( ! iseven(42) );
                expect( isodd(43) ).to.equal( ! iseven(43) );
            }
        )
    })
})