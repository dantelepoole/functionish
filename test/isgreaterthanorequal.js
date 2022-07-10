const expect = require('chai').expect;
const isgreaterthanorequal = require('../src/isgreaterthanorequal');

describe(`isgreaterthanorequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isgreaterthanorequal(1);
            expect(curried).to.be.a('function');
            expect( curried(0) ).not.to.be.a('function');
            expect( curried(0) ).to.be.true;
        }
    )

    it(`should return true if its first argument is numerically greater than or equal to its second argument`,
        function () {
            expect( isgreaterthanorequal(1, 0) ).to.be.true;
            expect( isgreaterthanorequal(1.1, 1) ).to.be.true;
            expect( isgreaterthanorequal(0, -1) ).to.be.true;
            expect( isgreaterthanorequal(1, 0.99) ).to.be.true;
            expect( isgreaterthanorequal(1, 1) ).to.be.true;
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expect( isgreaterthanorequal(1n, 0n) ).to.be.true;
            expect( isgreaterthanorequal(1n, 1n) ).to.be.true;
            expect( isgreaterthanorequal(0n, -1n) ).to.be.true;
            expect( isgreaterthanorequal(1n, 0) ).to.be.true;
            expect( isgreaterthanorequal(42n, 39.45) ).to.be.true;
        }
    )

    it(`should return false if its first argument is numerically less than its second argument`,
        function () {
            expect( isgreaterthanorequal(0, 1) ).to.be.false;
            expect( isgreaterthanorequal(1, 1.1) ).to.be.false;
            expect( isgreaterthanorequal(-1, 0) ).to.be.false;
            expect( isgreaterthanorequal(0.99, 1) ).to.be.false;
            expect( isgreaterthanorequal(1n, 2n) ).to.be.false;
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically greater than or equal to the second argument`,
        function () {
            expect( isgreaterthanorequal('b', 'a') ).to.be.true;
            expect( isgreaterthanorequal('a', 'a') ).to.be.true;
            expect( isgreaterthanorequal('aa', 'a') ).to.be.true;
            expect( isgreaterthanorequal('9', '8') ).to.be.true;
            expect( isgreaterthanorequal('a', '') ).to.be.true;
            expect( isgreaterthanorequal('', '') ).to.be.true;
        }
    )

    it(`should return the same result as the Javascript >=-operator`,
        function () {
            expect( isgreaterthanorequal('b', 1) ).to.be.equal( ('b' >= 1) );
            expect( isgreaterthanorequal(1, 'b') ).to.be.equal( (1 >= 'b') );
            expect( isgreaterthanorequal([], '1') ).to.be.equal( ([] >= '1') );
            expect( isgreaterthanorequal('1', []) ).to.be.equal( ('1' >= []) );
            expect( isgreaterthanorequal(null, 0) ).to.be.equal( (null >= 0) );
            expect( isgreaterthanorequal(0, null) ).to.be.equal( (0 >= null) );
            expect( isgreaterthanorequal(NaN, NaN) ).to.be.equal( (NaN >= NaN) );
            expect( isgreaterthanorequal(undefined, null) ).to.be.equal( (undefined >= null) );
            expect( isgreaterthanorequal(null, undefined) ).to.be.equal( (null >= undefined) );
        }
    )

    it(`should treat null as equal to 0`,
        function () {
            expect( isgreaterthanorequal(null, 0) ).to.be.true;
            expect( isgreaterthanorequal(0, null) ).to.be.true;
            expect( isgreaterthanorequal(null, -0) ).to.be.true;
            expect( isgreaterthanorequal(-0, null) ).to.be.true;
        }
    )

})
