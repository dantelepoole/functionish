const expect = require('chai').expect;
const format = require('../src/format');

describe(`format()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to Node's util.format() method`,
        function () {
            expect(format).to.equal( require('util').format );
        }
    )

})
