const expect = require('chai').expect;
const uniadic = require('../uniadic');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const countargs = spy(
    function countargs(...args) {
        return args.length;
    }
)

const sum_variadic = spy(
    function sum_variadic(...numbers) {
        return numbers.reduce( (a,b)=>(a+b), 0 );
    }
)

const sum_uniadic = spy(
    function sum_uniadic(numbers) {
        return numbers.reduce( (a,b)=>(a+b), 0 );
    }
)

describe('uniadic()', function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function() {
            const result = uniadic(sum_variadic);
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>uniadic({}) ).to.throw();
            expect( ()=>uniadic() ).to.throw();
        }
    )

    describe('the function returned by uniadic()', function() {

        it(`should have the same name as the target function, but tagged as 'uniadic'`,
            function() {
                const result = uniadic(sum_variadic);
                expect( result.name ).to.equal('uniadic sum_variadic');
            }
        )

    
        it(`should throw if its sole argument is not an iterable object`,
            function() {
                const result = uniadic(sum_variadic);
                expect( ()=>result({}) ).to.throw();
            }
        )

        it(`should pass the items from its list argument to the target function as individual arguments`,
            function() {
                const countargs_uniadic = uniadic(countargs);
                expect( countargs_uniadic( [1,2,3] ) ).to.equal(3);
                expect( countargs.calledOnceWith(1,2,3) ).to.be.true;
            }
        )

        it(`should partially apply the partialargs argument to uniadic() to the target function`,
            function() {
                const countargs_uniadic = uniadic(countargs, 1,2,3);
                expect( countargs_uniadic( [4,5,6] ) ).to.equal(6);
                expect( countargs.calledOnceWith(1,2,3,4,5,6) ).to.be.true;
            }
        )
    })
})