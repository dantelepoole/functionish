const expect = require('chai').expect;
const flip = require('../flip');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const returnargs = spy( (...args)=>args );
const returnargs_flipped = flip(returnargs);

describe(`flip()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return a function`,
        function () {
            expect( flip(returnargs) ).to.be.a('function');
        }
    )

    it(`should throw if the target function is not a function`,
        function () {
            expect( ()=>flip() ).to.throw();
            expect( ()=>flip(null) ).to.throw();
            expect( ()=>flip({}) ).to.throw();
        }
    )

    describe(`the function return by flip()`, function() {

        it(`should invoke the target function with its first two arguments in reverse order`,
            function () {
                
                returnargs_flipped(1,2);
                expect( returnargs.calledOnceWithExactly(2,1) ).to.be.true;
            }
        )

        it(`should invoke the target function without arguments if none were provided`,
            function () {
                
                returnargs_flipped();
                expect( returnargs.calledOnceWithExactly() ).to.be.true;
            }
        )

        it(`should, if passed only one argument, invoke the target function with undefined and the argument`,
            function () {
                
                returnargs_flipped(1);
                expect( returnargs.calledOnceWithExactly(undefined,1) ).to.be.true;
            }
        )

        it(`should pass the third and following arguments in their original order`,
            function () {
                
                returnargs_flipped(1,2,3,4,5);
                expect( returnargs.calledOnceWithExactly(2,1,3,4,5) ).to.be.true;
            }
        )

    })
})
