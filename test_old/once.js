const expect = require('chai').expect;
const once = require('../once');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(a,b) {
        return (a+b);
    }
)

describe(`once()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return a function`,
        function () {
            expect( once(sum) ).to.be.a('function');
        }
    )

    describe(`the function returned by once()`, function() {

        it(`should invoke the target function on the first call`,
            function () {

                const sumonce = once(sum);
                const result = sumonce(1,2);

                expect(result).to.equal(3);
                expect(sum.calledOnceWith(1,2)).to.be.true;

            }
        )

        it(`should not invoke the target function on subsequent calls, regardless of its arguments`,
            function () {
                const sumonce = once(sum);
                
                sumonce(1,2);
                sumonce(1,2);
                sumonce(42,1);

                expect( sum.calledOnceWith(1,2) ).to.be.true;
            }
        )

        it(`should return the initial return value on subsequent calls, regardless of its arguments`,
            function () {
                const sumonce = once(sum);
                
                const result1 = sumonce(1,2);
                const result2 = sumonce(1,2);
                const result3 = sumonce(42, 1);

                expect( result1 ).to.equal(3);
                expect( result2 ).to.equal(3);
                expect( result3 ).to.equal(3);
            }
        )

    })
})
