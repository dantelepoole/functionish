const expect = require('chai').expect;
const diff = require('../diff');
const isiterable = require('../isiterable');

const list1 = [1,2,3,4,2];
const list2 = [3,4,5,6,6];

describe(`diff()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried by default`,
        function () {
            const curried = diff([]);
            expect( curried ).to.be.a('function');
            expect( isiterable(curried([])) ).to.be.true;
            expect( curried([]) ).not.to.be.an('array');
        }
    )

    it(`should return an iterable object producing the items in list1 that are not present in list2`,
        function () {
            const result = diff(list1, list2);
            expect(Array.from(result)).to.be.deep.equal([1,2]);
        }
    )

    it(`should return an iterable object that produces no deplicate items`,
        function () {
            const result = diff([1,1,1,1,1,1,2], [2,3,3,3,3,3,3,3]);
            expect(Array.from(result)).to.be.deep.equal([1]);
        }
    )
    
    it(`should return an empty iterable object if both lists are empty`,
        function () {
            expect( Array.from(diff([],[])) ).to.be.deep.equal([]);
        }
    )

    it(`should return a shallow copy of list1 without duplicates if list2 is empty`,
        function () {
            expect( Array.from(diff([1,2,2,3,4],[])) ).to.be.deep.equal([1,2,3,4]);
            
            const alist = [1,2,3,4];
            const result = Array.from(diff(alist, []));
            expect( result ).to.not.be.equal(alist);
            expect( result ).to.be.deep.equal(alist);
        }
    )

    it(`should return an empty iterable object if list1 is empty`,
        function () {
            expect( Array.from(diff([],[1,2,3,4])) ).to.be.deep.equal([]);
        }
    )

    it(`should return iterable objects with its items in the same order as list1, except for duplicates`,
        function () {
            expect( Array.from(diff([42, 23, 15, 23, 42, 1],[5,6,7,8,9])) ).to.be.deep.equal([42,23,15,1]);
        }
    )
})