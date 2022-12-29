const expect = require('chai').expect;
const isiterable = require('../src/types/isiterable');

describe(`isiterable()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isiterable() ).to.be.false;
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

    it(`should return true if its argument has a method with the key [Symbol.iterator]`,
        function () {
            const obj = {
                [Symbol.iterator] : function() {}
            }

            expect( isiterable(obj) ).to.be.true;
        }
    )

    it(`should return true if its argument is an iterator object`,
        function () {
            const iterator = [1,2,3][Symbol.iterator]();
            expect( isiterable(iterator) ).to.be.true;
        }
    )

    it(`should return false if its argument is not an object`,
        function () {
            expect( isiterable(null) ).to.be.false;
            expect( isiterable(undefined) ).to.be.false;
            expect( isiterable(42) ).to.be.false;
            expect( isiterable('foobar') ).to.be.false;
            expect( isiterable(42n) ).to.be.false;
            expect( isiterable(x => x) ).to.be.false;
            expect( isiterable(true) ).to.be.false;
        }
    )
})
