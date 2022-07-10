const expect = require('chai').expect;
const isinteger = require('../src/isinteger');

describe(`isinteger()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be an alias for Number.isSafeInteger`,
        function () {
            expect(isinteger).to.be.equal(Number.isSafeInteger);
        }
    )

})