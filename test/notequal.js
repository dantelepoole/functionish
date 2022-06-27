const expect = require('chai').expect;
const notequal = require('../notequal');

const sentinel = {};
const sentinelarray = [];
const sentinelsymbol = Symbol();

describe(`notequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = notequal(42);
            expect(curried).to.be.a('function');
            expect( curried(42) ).not.to.be.a('function');
            expect( curried(42) ).to.be.false;
        }
    )

    it(`should compare with strict equality`,
        function () {
            expect( notequal(42, 42) ).to.be.false;
            expect( notequal(42, 42.0) ).to.be.false;
            expect( notequal(sentinel, sentinel) ).to.be.false;
            expect( notequal(sentinelarray, sentinelarray) ).to.be.false;
            expect( notequal(sentinelsymbol, sentinelsymbol) ).to.be.false;
            expect( notequal(notequal, notequal) ).to.be.false;
            expect( notequal(null, null) ).to.be.false;
            expect( notequal(undefined, undefined) ).to.be.false;

            expect( notequal(42.0, 42.01) ).to.be.true;
            expect( notequal([], []) ).to.be.true;
            expect( notequal({}, {}) ).to.be.true;
            expect( notequal( ()=>{}, ()=>{} ) ).to.be.true;
            expect( notequal(null, undefined) ).to.be.true;
            expect( notequal(undefined, NaN) ).to.be.true;
            expect( notequal(NaN, null) ).to.be.true;
        }
    )

    it(`should return true if either argument is NaN`,
        function () {
            expect( notequal(NaN, NaN) ).to.be.true;
        }
    )
})
