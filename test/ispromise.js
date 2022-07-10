const expect = require('chai').expect;
const ispromise = require('../src/ispromise');

describe(`ispromise()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to the isPromise() method on the 'types' object in Node's util-package`,
        function () {
            expect( ispromise ).to.equal( require('util').types.isPromise );
        }
    )

})
