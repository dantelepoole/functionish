const expect = require('chai').expect;
const memoize = require('../memoize');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(...numbers) {
        return numbers.reduce( (a,b)=>(a+b), 0 );
    }
)

function createcachefunc() {

    const map = new Map();

    return spy(
        function cachefunc(args, result) {
            if(arguments.length === 1) return (map.get( args.join() ) ?? null);
            map.set( args.join(), result );
        }
    )
}

describe(`memoize()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should throw if the cache function is neither a function nor null/undefined`,
        function() {
            expect( ()=>memoize({},sum) ).to.throw();
            expect( ()=>memoize(null,sum) ).to.throw();
            expect( ()=>memoize(undefined,sum) ).to.throw();
            expect( ()=>memoize(createcachefunc(),sum) ).not.to.throw();
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>memoize(createcachefunc(),{}) ).to.throw();
        }
    )

    describe(`the memoized function`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should pass its arguments to the target function if it has not received those same arguments earlier`,
            function() {

                const msum = memoize(sum);
                
                expect( msum(1,2,3) ).to.equal(6);
                expect( sum.calledOnceWith(1,2,3) ).to.be.true;
            }
        )

        it(`should not invoke the target function if it has received its arguments earlier`,
            function() {

                const msum = memoize(sum);

                expect( msum(1,2,3) ).to.equal(6);
                expect( sum.calledOnceWith(1,2,3) ).to.be.true;
                expect( sum.callCount ).to.equal(1);

                expect( msum(1,2,3) ).to.equal(6);
                expect( sum.callCount ).to.equal(1);
            }
        )

        it(`should call a custom cache function on each call if one is provided`,
            function() {

                const cachefunc = createcachefunc();
                const msum = memoize(cachefunc, sum);

                expect( msum(1,2,3) ).to.equal(6);
                expect( cachefunc.called ).to.be.true;

                expect( msum(1,2,3) ).to.equal(6);
                expect( cachefunc.called ).to.be.true;
            }
        )
    })
})