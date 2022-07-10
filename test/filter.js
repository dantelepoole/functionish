const expect = require('chai').expect;
const filter = require('../src/filter');
const isiterable = require('../src/isiterable');
const range = require('../src/range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const iseven = spy( x => (x%2) === 0 );
const alwaystrue = spy( () => true );
const alwaysfalse = spy( () => false );
const isunaryinvocation = spy( 
    function isunaryinvocation() {
        expect(arguments.length).to.equal(1)
    }
)

function spyfilterable(filterable) {

    const object = {
        filter : filterable.filter.bind(filterable)
    }

    spy(object, 'filter');

    return object;
}

describe(`filter()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = filter(iseven);
            expect( curried ).to.be.a('function');
            expect( curried(numbers1to10) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect( ()=>filter({}, [1,2,3]) ).to.throw();
        }
    )

    it(`should invoke the filter()-method of the filterable, if it has one`,
        function () {
            const filterable = spyfilterable(numbers1to10);
            const result = filter(iseven, filterable);
            expect(result).to.deep.equal([2,4,6,8,10]);
            expect(filterable.filter.callCount).to.equal(1);
        }
    )

    it(`should return an iterable if the filterable does not have a filter()-method but is iterable`,
        function () {
            const result = filter(iseven, range(10));
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should, if it iterates the filterable, call the predicate for each item in the filterable`,
        function () {
            const result = filter(iseven, range(10));
            Array.from(result);
            expect( iseven.callCount ).to.equal(10);
        }
    )

    it(`should ensure that one and only one argument is passed to the predicate function`,
        function () {
            const filterable = spyfilterable(numbers1to10);
            filter(isunaryinvocation, filterable);
            expect(isunaryinvocation.callCount).to.equal(10);
        }
    )

    it(`if passed an array, it should return a new array with only those items for which predicate returns true`,
        function () {
            const result = filter(iseven, numbers1to10);
            expect(result).to.be.an('array').with.length(5);
            expect(result).to.deep.equal([2,4,6,8,10]);
        }
    )
})
