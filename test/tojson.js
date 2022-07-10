const expect = require('chai').expect;
const tojson = require('../src/tojson');

describe(`tojson()`, function() {

    it(`should be a reference to the stringify() method on the global JSON object`,
        function () {
            expect( tojson ).to.be.equal( JSON.stringify );
        }
    )

})