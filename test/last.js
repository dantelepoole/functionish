const expect = require('chai').expect;
const last = require('../last');

describe(`last()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the last item in the indexable`,
        function () {
            expect( last([1,2,3]) ).to.equal(3);
            expect( last('foobar') ).to.equal('r')
        }
    )

    it(`should return undefined if the indexable is empty`,
        function () {
            expect( last([]) ).to.be.undefined;
            expect( last('') ).to.be.undefined;
        }
    )

    it(`should return undefined if the indexable is not indexable`,
        function () {
            expect( last(null) ).to.be.undefined;
            expect( last(undefined) ).to.be.undefined;
            expect( last() ).to.be.undefined;
            expect( last({}) ).to.be.undefined;
        }
    )
})
