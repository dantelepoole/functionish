const expect = require('chai').expect;
const islessthanorequal = require('../islessthanorequal');

describe(`islessthatorequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = islessthanorequal(0);
            expect(curried).to.be.a('function');
            expect( curried(1) ).not.to.be.a('function');
            expect( curried(1) ).to.be.true;
        }
    )

    it(`should return true if its first argument is numerically greater than its second argument`,
        function () {
            expect( islessthanorequal(0, 1) ).to.be.true;
            expect( islessthanorequal(1, 1.1) ).to.be.true;
            expect( islessthanorequal(-1, 0) ).to.be.true;
            expect( islessthanorequal(0.99, 1) ).to.be.true;
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expect( islessthanorequal(0n, 1n) ).to.be.true;
            expect( islessthanorequal(-1n, 0n) ).to.be.true;
            expect( islessthanorequal(0, 1n) ).to.be.true;
            expect( islessthanorequal(39.45, 42n) ).to.be.true;
        }
    )

    it(`should return true if its first argument is numerically less than or equal to its second argument`,
        function () {
            expect( islessthanorequal(0, 1) ).to.be.true;
            expect( islessthanorequal(1, 1.1) ).to.be.true;
            expect( islessthanorequal(-1, 0) ).to.be.true;
            expect( islessthanorequal(0.99, 1) ).to.be.true;
            expect( islessthanorequal(0,0) ).to.be.true;
            expect( islessthanorequal(1.0, 1) ).to.be.true;
            expect( islessthanorequal(1.0, 1.0) ).to.be.true;
            expect( islessthanorequal(1n, 1n) ).to.be.true;
            expect( islessthanorequal(1n, 2n) ).to.be.true;
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically less than or equal to the second argument`,
        function () {
            expect( islessthanorequal('1', 'b') ).to.be.true;
            expect( islessthanorequal('a', 'aa') ).to.be.true;
            expect( islessthanorequal('8', '9') ).to.be.true;
            expect( islessthanorequal('', 'a') ).to.be.true;
        }
    )

    it(`should return convert strings to numbers if possible`,
        function () {
            expect( islessthanorequal(1, '8') ).to.be.true;
            expect( islessthanorequal('8', 1) ).to.be.false;
        }
    )


    it(`should return the same result as the Javascript >-operator`,
        function () {
            expect( islessthanorequal('b', 1) ).to.equal( ('b' <= 1) );
            expect( islessthanorequal(1, 'b') ).to.equal( (1 <= 'b') );
            expect( islessthanorequal([], '1') ).to.equal( ([] <= '1') );
            expect( islessthanorequal('1', []) ).to.equal( ('1' <= []) );
            expect( islessthanorequal(null, 0) ).to.equal( (null <= 0) );
            expect( islessthanorequal(0, null) ).to.equal( (0 <= null) );
            expect( islessthanorequal(NaN, NaN) ).to.equal( (NaN <= NaN) );
            expect( islessthanorequal(undefined, null) ).to.equal( (undefined <= null) );
            expect( islessthanorequal(null, undefined) ).to.equal( (null <= undefined) );
        }
    )
})
