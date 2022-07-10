const expect = require('chai').expect;
const head = require('../src/head');

const indexable = Object.freeze(
    {
        length : 1,
        [0]    : 'foobar'
    }
)

describe(`head()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the first item of an indexable object`,
        function () {
            expect( head([42]) ).to.equal(42);
            expect( head('foobar') ).to.equal('f');
            expect( head(indexable) ).to.equal('foobar');
        }
    )

    it(`should return undefined if the indexable is empty`,
        function () {
            expect( head([]) ).to.be.undefined;
            expect( head('') ).to.be.undefined;
        }
    )

    it(`should return undefined if the indexable is not indexable`,
        function () {
            expect( head() ).to.be.undefined;
            expect( head(null) ).to.be.undefined;
            expect( head({}) ).to.be.undefined;
        }
    )
})
