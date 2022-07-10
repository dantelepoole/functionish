const expect = require('chai').expect;
const parsejson = require('../src/parsejson');

describe(`parsejson()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to JSON.parse()`,
        function () {
            expect(parsejson).to.be.equal(JSON.parse);
        }
    )

})