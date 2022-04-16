const expect = require('chai').expect;
const defaultto = require('../defaultto');

const markerobject = {};
const markerarray = [];
const markerfunction = () => {};

describe(`defaultto()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried by default`,
        function () {
            expect( defaultto(42) ).to.be.a('function');
        }
    )

    it(`should return its second argument if it is neither null, undefined nor NaN`,
        function () {
            expect( defaultto(42, 'foobar') ).to.be.equal('foobar');
            expect( defaultto(42, 42) ).to.be.equal(42);
            expect( defaultto(42, 42n) ).to.be.equal(42n);
            expect( defaultto(42, true) ).to.be.equal(true);
            expect( defaultto(42, markerobject) ).to.be.equal(markerobject);
            expect( defaultto(42, markerarray) ).to.be.equal(markerarray);
            expect( defaultto(42, markerfunction) ).to.be.equal(markerfunction);
        }
    )

    it(`should return its first argument if its second argument is null, undefined nor NaN`,
        function () {
            expect( defaultto(markerobject, null) ).to.be.equal(markerobject);
            expect( defaultto(markerobject, undefined) ).to.be.equal(markerobject);
            expect( defaultto(markerobject, NaN) ).to.be.equal(markerobject);
        }
    )
})