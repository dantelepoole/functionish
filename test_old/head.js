const expect = require('chai').expect;
const head = require('../head');

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

    it(`should return the first item of the list`,
        function () {
            expect( head([42]) ).to.equal(42);
            expect( head('foobar') ).to.equal('f');
            expect( head(indexable) ).to.equal('foobar');
        }
    )

    it(`should return undefined if the list is empty`,
        function () {
            expect( head([]) ).to.be.undefined;
            expect( head('') ).to.be.undefined;
        }
    )

})
