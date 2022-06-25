const expect = require('chai').expect;
const withdefault = require('../withdefault');

const sentinelobject = {};
const sentinelarray = [];
const sentinelfunction = () => {};

describe(`withdefault()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried by default`,
        function () {
            expect( withdefault(42) ).to.be.a('function');
            expect( withdefault(42, 42) ).to.equal(42);
        }
    )

    it(`should return the default if it is neither null, undefined nor NaN`,
        function () {
            expect( withdefault(42, 'foobar') ).to.be.equal('foobar');
            expect( withdefault(42, 42) ).to.be.equal(42);
            expect( withdefault(42, 42n) ).to.be.equal(42n);
            expect( withdefault(42, true) ).to.be.equal(true);
            expect( withdefault(42, sentinelobject) ).to.be.equal(sentinelobject);
            expect( withdefault(42, sentinelarray) ).to.be.equal(sentinelarray);
            expect( withdefault(42, sentinelfunction) ).to.be.equal(sentinelfunction);
        }
    )

    it(`should return the default value if thge value is null, undefined nor NaN`,
        function () {
            expect( withdefault(sentinelobject, null) ).to.be.equal(sentinelobject);
            expect( withdefault(sentinelobject, undefined) ).to.be.equal(sentinelobject);
            expect( withdefault(sentinelobject, NaN) ).to.be.equal(sentinelobject);
        }
    )
})