const expect = require('chai').expect;
const iserror = require('../src/iserror');
const iserror_native = require('util').types.isNativeError;

describe(`iserror()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be a reference to the isNativeError() method of the types object in Node's 'util' package`,
        function () {
            expect( iserror ).to.equal( iserror_native );
        }
    )

})
