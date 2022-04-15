const compose = require('../compose');
const expect = require('chai').expect;

let callcount = 0;
const invocations = [];

function sum(a,b) { callcount += 1; invocations.push(sum); return (a+b) };
function increment(x) { callcount += 1; invocations.push(increment); return (x+1) }
function double(x) { callcount += 1; invocations.push(double); return (x*2) };
function countargs(...args) { callcount += 1; invocations.push(countargs); return args.length }

describe('callable()', function() {

    beforeEach(
        function() {
            callcount = 0;
            invocations.length = 0;
        }
    )

    it('should return a function',
        function () {
            const func = compose(sum, increment, double);
            expect(func).to.be.a('function');
        }
    )

    it('should invoke the composed functions in reverse order (right to left)',
        function () {
            const func = compose(double, increment, sum);
            const result = func(1,2);

            expect(invocations).to.be.deep.equal([sum,increment,double]);
            expect(result).to.be.equal(8);
        }
    )

    it('should pass all its arguments to the first composed function',
        function () {
            const func = compose(countargs);
            const result = func(1,2,3);
            expect(result).to.be.equal(3);
        }
    )

    it('should be invocable as a unary function or a variadic function with the same result',
        function () {
            const unaryfunc = compose([double, increment, sum]);
            const unaryresult = unaryfunc(1,2);

            const variadicfunc = compose(double, increment, sum);
            const variadicresult = variadicfunc(1,2);

            expect(unaryresult).to.be.equal(variadicresult);
            expect(unaryresult).to.be.equal(8);
        }
    )

    it('should return its first argument if no functions are composed',
        function () {
            const func = compose();
            const result = func(42, 84);
            expect(result).to.be.equal(42);
        }
    )

    it('should return a function that throws if any of the composed functions are not functions',
        function () {
            const func = compose(sum, 42, double);
            expect( ()=>func(1,2) ).to.throw();
        }
    )
})