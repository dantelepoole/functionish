const expect = require('chai').expect;
const freeze = require('../src/freeze');

describe(`freeze()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to Javascript's Object.freeze() method`,
        function () {
            expect(freeze).to.equal(Object.freeze);
        }
    )

})
