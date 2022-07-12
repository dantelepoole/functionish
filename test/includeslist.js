const expect = require('chai').expect;
const includeslist = require('../includeslist');

const sentinel = {};

describe(`includeslist()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = includeslist(42);
            expect(curried).to.be.a('function');
            expect( curried([42]) ).to.be.true;
        }
    )

    it(`should return true if any item in the list is strictly equal to the argument value`,
        function () {
            expect( includeslist(sentinel, [null, undefined, NaN, 42, {}, [], includeslist, sentinel]) ).to.be.true; 
        }
    )

    it(`should return false if the list contains no item that is strictly equal to the argument value`,
        function () {
            expect( includeslist(sentinel, []) ).to.be.false;
        }
    )

    it(`should throw if its second argument is not iterable`,
        function () {
            expect( ()=>includeslist(42, {}) ).to.throw();
        }
    )

    it(`should work properly when searching for NaN`,
        function () {
            expect( includeslist(NaN, [NaN]) ).to.be.true;
        }
    )
})
