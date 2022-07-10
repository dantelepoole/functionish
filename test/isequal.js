const expect = require('chai').expect;
const isequal = require('../src/isequal');

const sentinel = {};
const sentinelarray = [];
const sentinelsymbol = Symbol();

describe(`isequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isequal(42);
            expect(curried).to.be.a('function');
            expect( curried(42) ).not.to.be.a('function');
            expect( curried(42) ).to.be.true;
        }
    )

    it(`should compare with strict equality`,
        function () {
            expect( isequal(42, 42) ).to.be.true;
            expect( isequal(42, 42.0) ).to.be.true;
            expect( isequal(sentinel, sentinel) ).to.be.true;
            expect( isequal(sentinelarray, sentinelarray) ).to.be.true;
            expect( isequal(sentinelsymbol, sentinelsymbol) ).to.be.true;
            expect( isequal(isequal, isequal) ).to.be.true;
            expect( isequal(null, null) ).to.be.true;
            expect( isequal(undefined, undefined) ).to.be.true;

            expect( isequal(42.0, 42.01) ).to.be.false;
            expect( isequal([], []) ).to.be.false;
            expect( isequal({}, {}) ).to.be.false;
            expect( isequal( ()=>{}, ()=>{} ) ).to.be.false;
            expect( isequal(null, undefined) ).to.be.false;
            expect( isequal(undefined, NaN) ).to.be.false;
            expect( isequal(NaN, null) ).to.be.false;
        }
    )

    it(`should return false if either argument is NaN`,
        function () {
            expect( isequal(NaN, NaN) ).to.be.false;
        }
    )
})
