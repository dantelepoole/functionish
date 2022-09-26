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

    it(`should return the logical complement of its argument`,
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
})