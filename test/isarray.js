const expect = require('chai').expect;
const isarray = require('../src/types/isarray');

describe(`isarray()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isarray() ).to.be.false;
        }
    )

    it(`should return true if the argument is an instance of the Javascript native Array-class`,
        function () {
            expect( isarray([]) ).to.be.true;
            expect( isarray( new Array(5) ) ).to.be.true;
        }
    )

    it(`should return true if the argument is an instance of a subclass of the Javascript native Array-class`,
        function () {

            class SubArray extends Array {}

            const subarray = new SubArray();
            expect( isarray(subarray) ).to.be.true;
        }
    )

    it(`should return false for other argument types`,
        function () {

            expect( isarray({}) ).to.be.false;
            expect( isarray(null) ).to.be.false;
            expect( isarray(undefined) ).to.be.false;
            expect( isarray('foobar') ).to.be.false;
            expect( isarray(42) ).to.be.false;
            expect( isarray(42n) ).to.be.false;
            expect( isarray(Symbol()) ).to.be.false;
            expect( isarray(true) ).to.be.false;
            expect( isarray(x => x) ).to.be.false;
            expect( isarray(new Int8Array(8)) ).to.be.false;
            expect( isarray(new Date()) ).to.be.false;
        }
    )
})
