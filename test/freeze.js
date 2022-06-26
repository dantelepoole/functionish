const expect = require('chai').expect;
const freeze = require('../freeze');

describe(`freeze()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to Javascript's Object.freeze method`,
        function () {
            expectequal( freeze, Object.freeze )
        }
    )

})
