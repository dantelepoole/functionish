const compose = require('../compose');
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

    describe('the function returned by compose()', function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it('should invoke the composed functions in reverse order (right to left)',
            function () {
                const func = compose(double, increment, sum);
                const result = func(1,2);

                expect(result).to.equal(8);

                expect( sum.calledImmediatelyBefore(increment) );
                expect( sum.calledWith(1,2) );

                expect( increment.calledImmediatelyBefore(double) );
                expect( increment.calledWith(3) );

                expect( double.calledImmediatelyAfter(increment) );
                expect( double.calledWith(4) );
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

        it('should throw if any of the composed functions are not functions',
            function () {
                const func = compose(sum, 42, double);
                expect( ()=>func(1,2) ).to.throw();
            }
        )

    })
})