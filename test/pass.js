const expect = require('chai').expect;
const pass = require('../pass');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const iseven = spy(
    function iseven(x) {
        return (x%2) === 0;
    }
)

const isnumber = spy(
    function isnumber(x) {
        return (typeof x === 'number');
    }
)

const ispositive = spy(
    function ispositive(x) {
        return (x > 0);
    }
)

describe(`pass()`, function() {

    afterEach(function() {
        sandbox.resetHistory();
    })
    
    beforeEach(function() {})

    it(`should throw if any filter function is not a function`,
        function () {
            expect( ()=>pass(iseven, {}) ).to.throw();
            expect( ()=>pass({}) ).to.throw();
        }
    )

    it(`should return a function`,
        function () {
            expect( pass(iseven) ).to.be.a('function');
        }
    )

    describe(`the function returned by pass()`, function() {

        afterEach(function() {
            sandbox.resetHistory();
        })
            
        beforeEach(function() {})

        it(`should be named '_filtertransformation_' so that transduce() can distinguish it from regular transformations`,
            function () {
                expect( pass(iseven).name ).to.equal('_filtertransformation_');
            }
        )

        it(`should return a function that returns true if all filter functions return true for the argument, false otherwise`,
            function () {

                const transformation = pass(isnumber, iseven, ispositive);
                const filter = transformation();
                
                expect(filter).to.be.a('function');

                expect( filter(2) ).to.be.true;
                expect( filter(1) ).to.be.false;
                expect( filter(0) ).to.be.false;
                expect( filter() ).to.be.false;
                expect( filter(null) ).to.be.false;
                expect( filter(NaN) ).to.be.false;
                expect( filter('foobar') ).to.be.false;
            }
        )

        it(`should return a filter function that is short circuited`,
            function () {

                const transformation = pass(isnumber, iseven, ispositive);
                const filter = transformation();
                
                expect(filter).to.be.a('function');

                expect( filter(2) ).to.be.true;
                expect( isnumber.calledOnceWith(2) ).to.be.true;
                expect( iseven.calledOnceWith(2) ).to.be.true;
                expect( ispositive.calledOnceWith(2) ).to.be.true;

                sandbox.resetHistory();

                expect( filter(1) ).to.be.false;
                expect( isnumber.calledOnceWith(1) ).to.be.true;
                expect( iseven.calledOnceWith(1) ).to.be.true;
                expect( ispositive.callCount ).to.equal(0);

                sandbox.resetHistory();

                expect( filter('foobar') ).to.be.false;
                expect( isnumber.calledOnceWith('foobar') ).to.be.true;
                expect( iseven.callCount ).to.equal(0);
                expect( ispositive.callCount ).to.equal(0);
            }
        )
    })
})