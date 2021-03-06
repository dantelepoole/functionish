const expect = require('chai').expect;
const curry = require('../curry');
const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(a,b) {
        return (a+b);
    }
)

const countargs = spy(
    function countargs(...args) {
        return args.length;
    }
)

const returnargs = spy(
    function returnargs(...args) {
        return args;
    }
)

describe(`curry()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return a function`,
        function () {
            expect( curry(sum) ).to.be.a('function');
            expect( curry(1, sum) ).to.be.a('function');
        }
    )

    it(`should collect the arity number of arguments before invoking the function`,
        function () {

            let curried = curry(sum); // arity = 2
            expect(curried).to.be.a('function');
            expect(curried(1)).to.be.a('function');
            expect(curried(1,2)).to.be.equal(3);
            expect(sum.callCount).to.be.equal(1);

            curried = curry(5, returnargs);
            expect(curried).to.be.a('function');
            expect(curried('foobar')).to.be.a('function');
            expect(curried('foobar',null)).to.be.a('function');
            expect(curried('foobar',null,undefined)).to.be.a('function');
            expect(curried('foobar',null,undefined,42)).to.be.a('function');
            expect(curried('foobar',null,undefined,42,NaN)).to.be.deep.equal(['foobar',null,undefined,42,NaN]);
            expect(returnargs.callCount).to.be.equal(1);

        }
    )

    it(`should collect arguments in successive invocations or combined`,
        function () {
            curried = curry(5, returnargs);
            curried = curried('foobar');
            expect(curried).to.be.a('function');
            curried = curried(null, undefined, NaN, 42);
            expect(curried).to.be.deep.equal(['foobar',null,undefined,NaN,42]);
            expect(returnargs.callCount).to.be.equal(1);
        }
    )

    it(`should read the arity from the function's length-property if passed only a single argument`,
        function () {

            let curried = curry(sum) // arity = 2
            expect( curried(42)(1) ).to.be.equal(43)

            curried = curry(countargs) // arity = 0
            expect( curried() ).to.be.equal(0);
            expect( curried(1) ).to.be.equal(1);
            expect( curried(1,2,3,4,5) ).to.be.equal(5);
        }
    )

    it(`should throw if the arity is neither a number nor undefined`,
        function () {

            expect( ()=>curry(null, countargs) ).to.throw();
            expect( ()=>curry('foobar', countargs) ).to.throw();
            expect( ()=>curry(42n, countargs) ).to.throw();
            expect( ()=>curry(undefined, countargs) ).not.to.throw();
        }
    )

    it(`should throw if the function argument is a string that does not resolve to a function`,
        function () {
            expect( ()=>curry('foobar') ).to.throw();
        }
    )

    it(`should throw if the function argument is neither a function nor a string that resolves to a function`,
        function () {
            expect( ()=>curry() ).to.throw();
            expect( ()=>curry(null) ).to.throw();
            expect( ()=>curry(42) ).to.throw();
            expect( ()=>curry({}) ).to.throw();
            expect( ()=>curry([]) ).to.throw();
        }
    )

    describe(`the curried function`, function() {

        it(`should preserve the target function's name`,
            function () {

                let curried = curry(2, countargs);
                expect( curried.name ).to.be.equal(`countargs`);

                curried = curry(2, (a,b)=>(a+b));
                expect( curried.name ).to.be.equal(``);
            }
        )

        it(`should be tagged as 'bound' on subsequent invocations`,
            function () {

                let curried = curry(2, countargs);
                expect( curried(1).name ).to.be.equal(`bound countargs`);

                curried = curry(2, (a,b)=>(a+b));
                expect( curried(1).name ).to.be.equal(`bound `);
            }
        )

        it(`should have a partial() method that returns the partially applied target function`,
            function () {

                const curried = curry(2, countargs);
                const partialcountargs = curried.partial(1);

                expect( partialcountargs.name ).to.equal(`partial countargs`);

                expect( partialcountargs(2,3) ).to.equal(3);
            }
        )
    })
})