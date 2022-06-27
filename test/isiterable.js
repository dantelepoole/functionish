const expect = require('chai').expect;
const isiterable = require('../isiterable');

describe(`isiterable()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has a method with the key [Symbol.iterator]`,
        function () {
            const obj = {
                [Symbol.iterator] : function() {}
            }

            expect( isiterable(obj) ).to.be.true;
        }
    )

    it(`should return false if its argument is a string`,
        function () {
            expect( isiterable('foobar') ).to.be.false;
        }
    )

    it(`should return true if its argument is an array, Map or Set`,
        function () {
            expect( isiterable([]) ).to.be.true;
            expect( isiterable( new Map() ) ).to.be.true;
            expect( isiterable( new Set() ) ).to.be.true;
        }
    )

    it(`should return true if its argument is an iterator object`,
        function () {
            const iterator = [1,2,3][Symbol.iterator]();
            expect( isiterable(iterator) ).to.be.true;
        }
    )
})
