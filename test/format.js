const expect = require('chai').expect;
const format = require('../format');

describe(`format()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to Node's util.format() method`,
        function () {
            expectequal( format, require('util').format );
        }
    )

})
