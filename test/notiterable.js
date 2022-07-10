const expect = require('chai').expect;
const notiterable = require('../src/notiterable');

describe(`notiterable()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has a method with the key [Symbol.iterator]`,
        function () {
            const obj = {
                [Symbol.iterator] : function() {}
            }

            expect( notiterable(obj) ).to.be.false;
        }
    )

    it(`should return false if its argument is an array, Map or Set`,
        function () {
            expect( notiterable([]) ).to.be.false;
            expect( notiterable( new Map() ) ).to.be.false;
            expect( notiterable( new Set() ) ).to.be.false;
        }
    )

    it(`should return false if its argument is an iterator object`,
        function () {
            const iterator = [1,2,3][Symbol.iterator]();
            expect( notiterable(iterator) ).to.be.false;
        }
    )

    it(`should return true if its argument is a string`,
        function () {
            expect( notiterable('foobar') ).to.be.true;
        }
    )
})
