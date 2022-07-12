const expect = require('chai').expect;
const map = require('../map');
const isiterable = require('../isiterable');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to5 = Object.freeze([1,2,3,4,5]);
const double = spy( x => (x*2) );

const isunaryinvocation = spy( 
    function isunaryinvocation() {
        expect(arguments.length).to.equal(1)
    }
)

function spymappable(mappable) {

    const object = {
        map : mappable.map.bind(mappable)
    }

    spy(object, 'map');

    return object;
}

describe(`map()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = map(double);
            expect( curried ).to.be.a('function');
            expect( curried(numbers1to5) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should throw if the mapping function is not a function`,
        function () {
            expect( ()=>map({}, [1,2,3]) ).to.throw();
        }
    )

    it(`should invoke the map()-method of the mappable, if it has one`,
        function () {
            const mappable = spymappable(numbers1to5);
            const result = map(double, mappable);
            expect(result).to.deep.equal([2,4,6,8,10]);
            expect(mappable.map.callCount).to.equal(1);
        }
    )

    it(`should return an iterable if the mappable does not have a map()-method but is iterable`,
        function () {
            const result = map(double, range(5));
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should, if it iterates the mappable, call the mapping function for each item in the mappable`,
        function () {
            const result = map(double, range(10));
            Array.from(result);
            expect( double.callCount ).to.equal(10);
        }
    )

    it(`should ensure that one and only one argument is passed to the mapping function`,
        function () {
            const mappable = spymappable(numbers1to5);
            map(isunaryinvocation, mappable);
            expect(isunaryinvocation.callCount).to.equal(5);
        }
    )

    it(`if passed an array, it should return a new array with the mapped items`,
        function () {
            const result = map(double, numbers1to5);
            expect(result).to.be.an('array').with.length(5);
            expect(result).to.deep.equal([2,4,6,8,10]);
        }
    )
})
