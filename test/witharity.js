const expect = require('chai').expect;
const witharity = require('../witharity');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const countargs = spy(

    function countargs(...args) {
        return args.length;
    }
)

describe(`witharity()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should be curried`,
        function() {
            const curried = witharity(0);
            expect(curried).to.be.a('function');
            expect( curried(countargs) ).to.be.a('function').with.length(0);
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>witharity(0, {}) ).to.throw();
        }
    )

    it(`should throw if the arity is not a positive integer`,
        function() {
            expect( ()=>witharity('foobar', countargs) ).to.throw();
            expect( ()=>witharity(-1, countargs) ).to.throw();
            expect( ()=>witharity(42.3, countargs) ).to.throw();
            expect( ()=>witharity(NaN, countargs) ).to.throw();
        }
    )

    describe(`the function returned by witharity()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })

        it(`should lways receive arity number of arguments, regardless of the number of arguments actually passed`,
            function() {

                expect( witharity(0, countargs)() ).to.equal(0);
                expect( witharity(0, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(0);

                expect( witharity(1, countargs)() ).to.equal(1);
                expect( witharity(1, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(1);

                expect( witharity(2, countargs)() ).to.equal(2);
                expect( witharity(2, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(2);

                expect( witharity(3, countargs)() ).to.equal(3);
                expect( witharity(3, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(3);

                expect( witharity(4, countargs)() ).to.equal(4);
                expect( witharity(4, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(4);

                expect( witharity(5, countargs)() ).to.equal(5);
                expect( witharity(5, countargs)(1,2,3,4,5,6,7,8,9,10) ).to.equal(5);

            }
        )

    })
})