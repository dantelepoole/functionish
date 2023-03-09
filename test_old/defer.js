const defer = require('../defer');
const expect = require('chai').expect;

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(

    function sum(...numbers) {
        return numbers.reduce( (a,b)=>(a+b), 0 );
    }
)

describe(`defer()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should return a function`,
        function() {
            expect( defer(sum) ).to.be.a('function');
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>defer() ).to.throw();
            expect( ()=>defer(null) ).to.throw();
            expect( ()=>defer({}) ).to.throw();
        }
    )

    describe(`the deferred function`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should pass the original arguments to the target function and return the result`,
            function() {
                const dsum = defer(sum,1,2);
                expect( dsum() ).to.equal(3);
                expect( sum.calledOnceWith(1,2) ).to.be.true;
            }
        )

        it(`should ignore any arguments passed to it`,
            function() {
                const dsum = defer(sum,1,2);
                expect( dsum(42) ).to.equal(3);
                expect( sum.calledOnceWith(1,2) ).to.be.true;
            }
        )
    })
})