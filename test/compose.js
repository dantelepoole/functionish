const compose = require('../src/compose');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy( function sum(a,b) { return (a+b) } )
const increment = spy( function increment(x) { return (x+1) } )
const double = spy( function double(x) { return (x*2) } )
const countargs = spy( function countargs(...args) { return args.length } )

describe('compose()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should return a function',
        function () {
            const func = compose(double, increment, sum);
            expect(func).to.be.a('function');
        }
    )

    it('should throw if any of the composed functions are not functions',
        function () {
            expect( ()=>compose(sum, 42, double) ).to.throw();
        }
    )

    describe('the function returned by compose()', function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it('should invoke the composed functions in reverse order (right to left)',
            function () {
                const composition = compose(double, increment, sum);
                const result = composition(1,2);
                expect( result ).to.equal(8);

                expect( sum.calledImmediatelyBefore(increment) ).to.be.true;
                expect( sum.calledWith(1,2) ).to.be.true;
                expect( sum.returned(3) ).to.be.true;

                expect( increment.calledImmediatelyBefore(double) ).to.be.true;
                expect( increment.calledWith(3) ).to.be.true;
                expect( increment.returned(4) ).to.be.true;

                expect( double.calledImmediatelyAfter(increment) ).to.be.true;
                expect( double.calledWith(4) ).to.be.true;
                expect( double.returned(8) ).to.be.true;
            }
        )

        it('should pass all its arguments to the first composed function',
            function () {
                const func = compose(countargs);
                const result = func(1,2,3);
                expect(result).to.be.equal(3);
            }
        )

        it('should return its first argument if no functions are composed',
            function () {
                const func = compose();
                const result = func(42, 84);
                expect(result).to.be.equal(42);
            }
        )
    })
})