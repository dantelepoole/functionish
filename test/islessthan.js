const expect = require('chai').expect;
const islessthan = require('../islessthan');

describe(`islessthan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = islessthan(0);
            expect(curried).to.be.a('function');
            expect( curried(1) ).to.be.a('boolean');
        }
    )

    it(`should return true if its second argument is numerically less than its first argument`,
        function () {
            expect( islessthan(1, 0) ).to.be.true;
            expect( islessthan(1.1, 1) ).to.be.true;
            expect( islessthan(0, -1) ).to.be.true;
            expect( islessthan(1, 0.99) ).to.be.true;
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expect( islessthan(1n, 0n) ).to.be.true;
            expect( islessthan(0n, -1n) ).to.be.true;
            expect( islessthan(1, 0n) ).to.be.true;
            expect( islessthan(42n, 39.45) ).to.be.true;
        }
    )

    it(`should return false if its first argument is numerically less than its second argument`,
        function () {
            expect( islessthan(0, 1) ).to.be.false;
            expect( islessthan(1.1, 1.1) ).to.be.false;
            expect( islessthan(-1, 0) ).to.be.false;
            expect( islessthan(0,0) ).to.be.false;
            expect( islessthan(1.0, 1.0) ).to.be.false;
            expect( islessthan(1.0, 1.0) ).to.be.false;
            expect( islessthan(1n, 1n) ).to.be.false;
            expect( islessthan(1, 2n) ).to.be.false;
        }
    )

    it(`should return true if both arguments are strings and the second argument is alphanumerically less than the first argument`,
        function () {
            expect( islessthan('b,', '1') ).to.be.true;
            expect( islessthan('aa', 'a') ).to.be.true;
            expect( islessthan('9', '8') ).to.be.true;
            expect( islessthan('a', '') ).to.be.true;
        }
    )

    it(`should return convert strings to numbers if possible`,
        function () {
            expect( islessthan('8', 1) ).to.be.true;
            expect( islessthan(1, '8') ).to.be.false;
        }
    )


    it(`should return the same result as the Javascript >-operator`,
        function () {
            expect( islessthan(1, 'b') ).to.equal( ('b' < 1) );
            expect( islessthan('b', 1) ).to.equal( (1 < 'b') );
            expect( islessthan('1', []) ).to.equal( ([] < '1') );
            expect( islessthan([], '1') ).to.equal( ('1' < []) );
            expect( islessthan(0, null) ).to.equal( (null < 0) );
            expect( islessthan(null, 0) ).to.equal( (0 < null) );
            expect( islessthan(NaN, NaN) ).to.equal( (NaN < NaN) );
            expect( islessthan(undefined, null) ).to.equal( (undefined < null) );
            expect( islessthan(null, undefined) ).to.equal( (null < undefined) );
        }
    )

})
