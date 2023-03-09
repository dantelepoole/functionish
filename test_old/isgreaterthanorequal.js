const expect = require('chai').expect;
const isgreaterthanorequal = require('../isgreaterthanorequal');

describe(`isgreaterthanorequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isgreaterthanorequal(1);
            expect(curried).to.be.a('function');
            expect( curried(0) ).to.be.a('boolean');
        }
    )

    it(`should return true if its second argument is numerically greater than or equal to its first argument`,
        function () {
            expect( isgreaterthanorequal(0, 1) ).to.be.true;
            expect( isgreaterthanorequal(1, 1.1) ).to.be.true;
            expect( isgreaterthanorequal(-1, 0) ).to.be.true;
            expect( isgreaterthanorequal(0.99, 1) ).to.be.true;
            expect( isgreaterthanorequal(1, 1) ).to.be.true;
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expect( isgreaterthanorequal(0n, 1n) ).to.be.true;
            expect( isgreaterthanorequal(1n, 1n) ).to.be.true;
            expect( isgreaterthanorequal(-1n, 0n) ).to.be.true;
            expect( isgreaterthanorequal(0, 1n) ).to.be.true;
            expect( isgreaterthanorequal(39.45, 42n) ).to.be.true;
        }
    )

    it(`should return false if its second argument is numerically less than its first argument`,
        function () {
            expect( isgreaterthanorequal(1, 0) ).to.be.false;
            expect( isgreaterthanorequal(1.1, 1) ).to.be.false;
            expect( isgreaterthanorequal(0, -1) ).to.be.false;
            expect( isgreaterthanorequal(1, 0.99) ).to.be.false;
            expect( isgreaterthanorequal(2n, 1n) ).to.be.false;
        }
    )

    it(`should return true if both arguments are strings and the second argument is alphanumerically greater than or equal to the first argument`,
        function () {
            expect( isgreaterthanorequal('a', 'b') ).to.be.true;
            expect( isgreaterthanorequal('a', 'a') ).to.be.true;
            expect( isgreaterthanorequal('a', 'aa') ).to.be.true;
            expect( isgreaterthanorequal('8', '9') ).to.be.true;
            expect( isgreaterthanorequal('', 'a') ).to.be.true;
            expect( isgreaterthanorequal('', '') ).to.be.true;
        }
    )

    it(`should return the same result as the Javascript >=-operator`,
        function () {
            expect( isgreaterthanorequal(1, 'b') ).to.be.equal( ('b' >= 1) );
            expect( isgreaterthanorequal('b', 1) ).to.be.equal( (1 >= 'b') );
            expect( isgreaterthanorequal('1', []) ).to.be.equal( ([] >= '1') );
            expect( isgreaterthanorequal([], '1') ).to.be.equal( ('1' >= []) );
            expect( isgreaterthanorequal(0, null) ).to.be.equal( (null >= 0) );
            expect( isgreaterthanorequal(null, 0) ).to.be.equal( (0 >= null) );
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
