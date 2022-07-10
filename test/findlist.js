const expect = require('chai').expect;
const findlist = require('../src/findlist');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

const sentinel = Object.freeze({});

const iseven = spy( x => (x%2) === 0 );
const isodd = spy( x => (x%2) === 1 );
const issentinel = spy( x => (x === sentinel) );

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

describe(`findlist()`, function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it(`should be curried`,
        function () {
            const curried = findlist(iseven);
            expect(curried).to.be.a('function');
            expect( curried(numbers1to10) ).to.deep.equal(2);
        }
    )

    it(`should throw if the predicate is not a function`,
        function () {
            expect( ()=>findlist({}, []) ).to.throw();
        }
    )

    it(`should throw if the list is not iterable`,
        function () {
            expect( ()=>findlist(iseven, {}) ).to.throw();
        }
    )

    it(`should return the first item in the list for which the predicate returns a truthy value`,
        function () {
            expect( findlist(iseven, numbers1to10) ).to.equal(2);
            expect( findlist(isodd, numbers1to10) ).to.equal(1);
            expect( findlist(issentinel, [sentinel]) ).to.equal(sentinel);
        }
    )

    it(`should return undefined if the predicate returns false for all items in the list`,
        function () {
            expect( findlist(issentinel, numbers1to10) ).to.be.undefined;
        }
    )

    it(`should return undefined if the list is empty`,
        function () {
            expect( findlist(iseven, []) ).to.be.undefined;
        }
    )

    it(`should call the predicate for each item in the list until it finds the first matching item`,
        function () {
            findlist(iseven, numbers1to10);
            expect(iseven.callCount).to.equal(2);

            findlist(isodd, numbers1to10);
            expect(isodd.callCount).to.equal(1);

            findlist(issentinel, [,,,,,,,,sentinel] );
            expect(issentinel.callCount).to.equal(9);
        }
    )
})
