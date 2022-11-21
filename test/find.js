const expect = require('chai').expect;
const find = require('../find');
const range = require('../range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sentinel = Object.freeze({});

const iseven = spy( x => (x%2) === 0 );
const isodd = spy( x => (x%2) === 1 );
const issentinel = spy( x => (x === sentinel) );

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

function spyfindable(findable) {

    const object = {
        find : findable.find.bind(findable)
    }

    spy(object, 'find');

    return object;
}

describe(`find()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = find(iseven);
            expect(curried).to.be.a('function');
            expect( curried(numbers1to10) ).to.deep.equal(2);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect( ()=>find({}, []) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>find(iseven, {}) ).to.throw();
        }
    )

    it(`should return the first value in the list for which the predicate returns a truthy value`,
        function () {
            expect( find(iseven, range(10)) ).to.equal(2);
            expect(iseven.callCount).to.equal(2);
        }
    )

    it(`should return undefined if the predicate fails for all values in the list`,
        function () {
            expect( find(issentinel, numbers1to10) ).to.be.undefined;
        }
    )

    it(`should return undefined if the list is empty`,
        function () {
            expect( find(iseven, []) ).to.be.undefined;
        }
    )

    it(`should call the predicate for each item in the list until it finds the first matching item`,
        function () {
            find(iseven, numbers1to10);
            expect(iseven.callCount).to.equal(2);

            find(isodd, numbers1to10);
            expect(isodd.callCount).to.equal(1);

            find(issentinel, [,,,,,,,,sentinel] );
            expect(issentinel.callCount).to.equal(9);
        }
    )
})
