const expect = require('chai').expect;
const partial = require('../partial');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sum = spy(
    function sum(a,b) {
        return (a+b);
    }
)

const returnthis = spy(
    function returnthis() {
        return this;
    }
)

const returnarguments = spy(
    function returnarguments(...args) {
        return args;
    }
)

describe(`partial()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should return a function`,
        function () {
            expect( partial(sum, 1) ).to.be.a('function');
        }
    )

    describe(`the partiallly applied function`, function() {

        it(`should have the same name as the target function but tagged as 'partial'`,
            function () {

                const increment = partial(sum, 1);
                expect( increment.name ).to.equal('partial sum');

                expect( partial( (a,b)=>(a+b), 1 ).name ).to.equal('partial ');
            }
        )

        it(`should invoke the target function`,
            function () {

                const increment = partial(sum, 1);
                const result = increment(42);
                expect(result).to.equal(43);
                expect(sum.callCount).to.equal(1);
            }
        )

        it(`should invoke the target function with the bound arguments followed by its own arguments`,
            function () {
                const reflectargs = partial(returnarguments, 1,2,3);
                const result = reflectargs(4,5,6);
                expect(result).to.deep.equal([1,2,3,4,5,6]);
                expect(returnarguments.calledOnceWith(1,2,3,4,5,6)).to.be.true;
            }
        )

        it(`should propagate a custom 'this'-object to the target function`,
            function () {
                const that = {};
                const reflectthis = partial(returnthis, 1,2,3);

                let result = reflectthis.call(that, 4,5,6);
                expect(result).to.equal(that);
                expect(returnthis.calledOnceWith(1,2,3,4,5,6)).to.be.true;

                sandbox.resetHistory();

                result = reflectthis.bind(that, 4,5)(6);
                expect(result).to.equal(that);
                expect(returnthis.calledOnceWith(1,2,3,4,5,6)).to.be.true;
            }
        )
    })
})