const expect = require('chai').expect;
const negate = require('../negate');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

describe(`negate()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should throw if the argument is not a function`,
        function () {

            expect( () => negate(true) ).to.throw();
            expect( () => negate([]) ).to.throw();
            expect( () => negate({}) ).to.throw();
            expect( () => negate(42) ).to.throw();
            expect( () => negate(42n) ).to.throw();
            
            expect( () => negate(false) ).to.throw();
            expect( () => negate(null) ).to.throw();
            expect( () => negate(undefined) ).to.throw();
            expect( () => negate(NaN) ).to.throw();
            expect( () => negate(0) ).to.throw();
            expect( () => negate(-0) ).to.throw();
        }
    )

    it(`should return a function`,
        function () {
            expect( negate(iseven) ).to.be.a('function');
        }
    )

    it(`should load functions from packages or file modules if the argument is a string`);

    describe(`the function returned by negate()`, function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it(`return pass the arguments to the target function`,
            function () {
                const isodd = negate(iseven);
                isodd(42);

                expect(iseven.calledOnceWith(42)).to.be.true;
            }
        )

        it(`return the logical complement of the target function's return value`,
            function () {
                const isodd = negate(iseven);

                expect( isodd(42) ).to.equal( ! iseven(42) );
                expect( isodd(43) ).to.equal( ! iseven(43) );
            }
        )
    })
})