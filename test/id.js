const expect = require('chai').expect;
const id = require('../id');

describe(`id()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return its first argument`,
        function () {
            expect( id(42) ).to.equal(42);
        }
    )

    it(`should ignore other arguments than the first one`,
        function () {
            expect( id(42, 24, 33) ).to.equal(42);
        }
    )

    it(`should return undefined if called without arguments`,
        function () {
            expect( id() ).to.be.undefined;
        }
    )
})
