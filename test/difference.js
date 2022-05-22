const expect = require('chai').expect;
const difference = require('../difference');
const isiterable = require('../isiterable');

const list1 = [1,2,3,4,2];
const list2 = [3,4,5,6,6];

describe(`difference()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried by default`,
        function () {
            const curried = difference([]);
            expect( curried ).to.be.a('function');
            expect( curried([]) ).to.be.an('array');
        }
    )

    it(`should return an array of the items in list1 that are not present in list2`,
        function () {
            const result = difference(list1, list2);
            expect(result).to.be.deep.equal([1,2]);
        }
    )

    it(`should return an array without duplicate items`,
        function () {
            const result = difference([1,1,1,1,1,1,2], [2,3,3,3,3,3,3,3]);
            expect(result).to.be.deep.equal([1]);
        }
    )
    
    it(`should return an empty array if both arguments are empty arrays`,
        function () {
            expect( difference([],[]) ).to.be.deep.equal([]);
        }
    )

    it(`should return a shallow copy of list1 without duplicates if list2 is empty`,
        function () {
            expect( difference([1,2,2,3,4],[]) ).to.be.deep.equal([1,2,3,4]);
            
            const alist = [1,2,3,4];
            const result = difference(alist, []);
            expect( result ).to.not.be.equal(alist);
            expect( result ).to.be.deep.equal(alist);
        }
    )

    it(`should return an empty array if list1 is empty`,
        function () {
            expect( difference([],[1,2,3,4]) ).to.be.deep.equal([]);
        }
    )

    it(`should return array with its items in the same order as list1, except for duplicates`,
        function () {
            expect( difference([42, 23, 15, 23, 42, 1],[5,6,7,8,9]) ).to.be.deep.equal([42,23,15,1]);
        }
    )

    it(`should return an iterable if the first argument is not an array`,
        function () {

            let result = difference('hari', ['s','e','l','d','o','n']);
            
            expect( isiterable(result) ).to.be.true;
            expect( Array.isArray(result) ).to.be.false;
            expect( Array.from(result) ).to.be.deep.equal(['h','a','r','i']);
            
            expect( difference(['h','a','r','i'], 'seldon') ).to.be.deep.equal(['h','a','r','i']);
        }
    )
})