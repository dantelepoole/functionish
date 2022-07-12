const expect = require('chai').expect;
const predicate = require('../predicate');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

describe(`predicate()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should throw if the filter is not a function`,
        function () {
            expect( ()=>predicate() ).to.throw();
            expect( ()=>predicate({}) ).to.throw();
        }
    )

    it(`should return a function`,
        function () {
            expect( predicate(iseven) ).to.be.a('function');
        }
    )

    describe(`the function returned by predicate()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should return the filter function passed to to predicate()`,
            function () {
                expect( predicate(iseven)() ).to.equal(iseven);
            }
        )

        it(`should be named '_filtertransformation_' so that transduce() can distinguish it from regular transformations`,
            function () {
                expect( predicate(iseven).name ).to.equal('_filtertransformation_');
            }
        )
    })
})