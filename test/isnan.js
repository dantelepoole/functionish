const expect = require('chai').expect;
const isnan = require('../isnan');

describe(`isnan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be an alias for Number.isNaN()`,
        function () {
            expect( isnan ).to.equal( Number.isNaN );
        }
    )

})
