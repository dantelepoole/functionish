const pipe = require('../pipe');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy( function sum(a,b){ return (a+b) } );
const increment = spy( function increment(x) { return (x+1) } );
const double = spy( function double(x) { return (x*2) } );
const countargs = spy( function countargs(...args) { return args.length } );

const pipeline = pipe(sum, increment, double);

describe('pipe()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should return a function',
        function () {
            expect( pipe(sum, increment, double) ).to.be.a('function');
        }
    )

    it('should throw if any argument function is not a function',
        function () {
            expect( ()=>pipe(double, 42, sum) ).to.throw();
            expect( ()=>pipe(42, double, sum) ).to.throw();
            expect( ()=>pipe(double, sum, 42) ).to.throw();
            expect( ()=>pipe(42) ).to.throw();
        }
    )

    describe('the piped function', function() {

        beforeEach(
            function() {
                sandbox.resetHistory();
            }
        )

        it('should invoke the target functions in order (left to right)',
            function () {

                pipeline(1,2);

                expect(sum.calledImmediatelyBefore(increment)).to.be.true;
                expect(increment.calledImmediatelyBefore(double)).to.be.true;
            }
        )

        it('should pass all its arguments to the first target function',
            function () {

                pipeline(1,2);

                expect(sum.calledOnceWith(1,2)).to.be.true;
            }
        )

        it('should pass each subsequent target function the return value of the previously invoked target function',
            function () {

                pipeline(1,2);

                expect(sum.returned(3)).to.be.true;
                expect(increment.calledOnceWith(3)).to.be.true;
                expect(increment.returned(4)).to.be.true;
                expect(double.calledOnceWith(4)).to.be.true;
            }
        )

        it('should return the return value of the last target function',
            function () {

                const result = pipeline(1,2);

                expect(result).to.equal(8);
                expect(double.returned(8)).to.be.true;
            }
        )

        it('should return its first argument if pipe() is called without any functions',
            function () {
                const emptypipeline = pipe();
                const result = emptypipeline(42, 84);
                expect(result).to.be.equal(42);
            }
        )

    })
})