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
            expect( Array.from( curried(numbers1to5) ) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should throw if the map function is not a function`,
        function () {
            expect( ()=>map({}, [1,2,3]) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>map(double, {}) ).to.throw();
        }
    )

    it(`should return an iterable object`,
        function () {
            const result = map(double, range(5));
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should call the map function for each item in the list`,
        function () {
            const result = map(double, range(10));
            Array.from(result);
            expect( double.callCount ).to.equal(10);
        }
    )

    it.skip(`should accept a string path for the map function argument`);
})
