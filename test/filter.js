const expect = require('chai').expect;
const filter = require('../filter');
const isiterable = require('../isiterable');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const iseven = spy( x => (x%2) === 0 );

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

            const result = Array.from( curried(numbers1to10) );
            expect(result).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect( ()=>filter({}, [1,2,3]) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>filter( iseven, {} ) ).to.throw();
        }
    )

    it(`should return an iterable object`,
        function () {
            const result = filter(iseven, range(10));
            expect( isiterable(result) ).to.be.true;
            expect( Array.from(result) ).to.deep.equal([2,4,6,8,10]);
        }
    )

    it(`should call the predicate for each value in the list`,
        function () {
            const result = filter(iseven, range(10));
            Array.from(result);
            expect( iseven.callCount ).to.equal(10);
        }
    )

    it(`should return an iterable object that produces only those values from the list for which the predicate returns a truthy value`,
        function () {
            const result = Array.from( filter(iseven, numbers1to10) );
            expect(result).to.be.an('array').with.length(5);
            expect(result).to.deep.equal([2,4,6,8,10]);
        }
    )
})
