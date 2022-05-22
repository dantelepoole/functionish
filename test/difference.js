const expect = require('chai').expect;
const difference = require('../difference');
const isiterable = require('../isiterable');

const list1 = [1,2,3,4,2];
const list2 = [3,4,5,6,6];

function toarray(iterable) {
    expect( isiterable(iterable) || (typeof iterable === 'string') ).to.be.true;
    return Array.from(iterable)
}

describe(`difference()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried by default`,
        function () {
            const curried = difference([]);
            expect( curried ).to.be.a('function');
            expect( isiterable(curried([])) ).to.be.true;
            expect( curried([]) ).not.to.be.an('array');
        }
    )

    it(`should return an array of the items in list1 that are not present in list2`,
        function () {
            const result = difference(list1, list2);
            expect(toarray(result)).to.be.deep.equal([1,2]);
        }
    )

    it(`should return an array without duplicate items`,
        function () {
            const result = difference([1,1,1,1,1,1,2], [2,3,3,3,3,3,3,3]);
            expect(toarray(result)).to.be.deep.equal([1]);
        }
    )
    
    it(`should return an empty array if both arguments are empty arrays`,
        function () {
            expect( toarray(difference([],[])) ).to.be.deep.equal([]);
        }
    )

    it(`should return a shallow copy of list1 without duplicates if list2 is empty`,
        function () {
            expect( toarray(difference([1,2,2,3,4],[])) ).to.be.deep.equal([1,2,3,4]);
            
            const alist = [1,2,3,4];
            const result = toarray(difference(alist, []));
            expect( result ).to.not.be.equal(alist);
            expect( result ).to.be.deep.equal(alist);
        }
    )

    it(`should return an empty array if list1 is empty`,
        function () {
            expect( toarray(difference([],[1,2,3,4])) ).to.be.deep.equal([]);
        }
    )

    it(`should return array with its items in the same order as list1, except for duplicates`,
        function () {
            expect( toarray(difference([42, 23, 15, 23, 42, 1],[5,6,7,8,9])) ).to.be.deep.equal([42,23,15,1]);
        }
    )
})