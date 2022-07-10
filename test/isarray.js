const expect = require('chai').expect;
const isarray = require('../src/isarray');

describe(`isarray()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to Array.isArray()`,
        function () {
            expect( isarray ).to.equal(Array.isArray);
        }
    )

})
