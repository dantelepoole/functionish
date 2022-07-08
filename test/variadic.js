const expect = require('chai').expect;
const variadic = require('../variadic');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(numbers) {
        return numbers.reduce( (a,b)=>(a+b), 0 );
    }
)

const countargs = spy(
    function countargs(...args) {
        return args.length;
    }
)

describe('variadic()', function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function() {
            expect( variadic(sum) ).to.be.a('function');
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>variadic({}) ).to.throw();
            expect( ()=>variadic() ).to.throw();
        }
    )

    describe('the function returned by variadic()', function() {

        it(`should have the same name as the target function, but tagged as 'variadic'`,
            function() {
                const result = variadic(sum);
                expect( result.name ).to.equal('variadic sum');
            }
        )

        it(`should pass its arguments to the target function as a single array argument`,
            function() {
                const countargs_variadic = variadic(countargs);
                expect( countargs_variadic(1,2,3) ).to.equal(1);
                expect( countargs.calledOnceWith( [1,2,3]) ).to.be.true;
            }
        )

        it(`should prepend the partialargs to its own arguments before passing them to the target function`,
            function() {
                const countargs_variadic = variadic(countargs, 1,2,3);
                expect( countargs_variadic(4,5,6) ).to.equal(1);
                expect( countargs.calledOnceWith([1,2,3,4,5,6]) ).to.be.true;
            }
        )
    })
})