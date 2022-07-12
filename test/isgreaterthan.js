const expect = require('chai').expect;
const isgreaterthan = require('../isgreaterthan');

describe(`isgreaterthan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isgreaterthan(1);
            expect(curried).to.be.a('function');
            expect( curried(0) ).not.to.be.a('function');
            expect( curried(0) ).to.be.true;
        }
    )

    it(`should return true if its first argument is numerically greater than its second argument`,
        function () {
            expect( isgreaterthan(1, 0) ).to.be.true;
            expect( isgreaterthan(1.1, 1) ).to.be.true;
            expect( isgreaterthan(0, -1) ).to.be.true;
            expect( isgreaterthan(1, 0.99) ).to.be.true;
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expect( isgreaterthan(1n, 0n) ).to.be.true;
            expect( isgreaterthan(0n, -1n) ).to.be.true;
            expect( isgreaterthan(1n, 0) ).to.be.true;
            expect( isgreaterthan(42n, 39.45) ).to.be.true;
        }
    )

    it(`should return false if its first argument is numerically less than or equal to its second argument`,
        function () {
            expect( isgreaterthan(0, 1) ).to.be.false;
            expect( isgreaterthan(1, 1.1) ).to.be.false;
            expect( isgreaterthan(-1, 0) ).to.be.false;
            expect( isgreaterthan(0.99, 1) ).to.be.false;
            expect( isgreaterthan(0,0) ).to.be.false;
            expect( isgreaterthan(1, 1.0) ).to.be.false;
            expect( isgreaterthan(1.0, 1.0) ).to.be.false;
            expect( isgreaterthan(1n, 1n) ).to.be.false;
            expect( isgreaterthan(1n, 2n) ).to.be.false;
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically greater than the second argument`,
        function () {
            expect( isgreaterthan('b', 'a') ).to.be.true;
            expect( isgreaterthan('aa', 'a') ).to.be.true;
            expect( isgreaterthan('9', '8') ).to.be.true;
            expect( isgreaterthan('a', '') ).to.be.true;
        }
    )

    it(`should return convert strings to numbers if possible`,
        function () {
            expect( isgreaterthan(1, '8') ).to.be.false;
            expect( isgreaterthan('8', 1) ).to.be.true;
        }
    )

    it(`should return the same result as the Javascript >-operator`,
        function () {
            expect( isgreaterthan('b', 1) ).to.equal( ('b' > 1) );
            expect( isgreaterthan(1, 'b') ).to.equal( (1 > 'b') );
            expect( isgreaterthan([], '1') ).to.equal( ([] > '1') );
            expect( isgreaterthan('1', []) ).to.equal( ('1' > []) );
            expect( isgreaterthan(null, 0) ).to.equal( (null > 0) );
            expect( isgreaterthan(0, null) ).to.equal( (0 > null) );
            expect( isgreaterthan(NaN, NaN) ).to.equal( (NaN > NaN) );
            expect( isgreaterthan(undefined, null) ).to.equal( (undefined > null) );
            expect( isgreaterthan(null, undefined) ).to.equal( (null > undefined) );
        }
    )
})
