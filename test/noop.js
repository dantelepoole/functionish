const expect = require('chai').expect;
const noop = require('../noop');

describe(`noop()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should always return undefined`,
        function () {
            expect( noop() ).to.be.undefined;
            expect( noop(undefined) ).to.be.undefined;
            expect( noop(null) ).to.be.undefined;
            expect( noop(42) ).to.be.undefined;
            expect( noop('f', 'o', 'o', 'b', 'a', 'r') ).to.be.undefined;
        }
    )

})
