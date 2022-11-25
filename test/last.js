const expect = require('chai').expect;
const last = require('../last');
const range = require('../range');

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

    it(`should work with iterable objects, even if they are not indexable`,
        function () {
            expect( last([1,2,3]) ).to.equal(3);
            expect( last('foobar') ).to.equal('r')
        }
    )

    it(`should return undefined if the indexable is empty`,
        function () {
            expect( last( range(5) ) ).to.equal(5);
        }
    )

    it(`should throw if the indexable is neither indexable nor iterable`,
        function () {
            expect( () => last(null) ).to.throw();
            expect( () => last(undefined) ).to.throw();
            expect( () => last() ).to.throw();
            expect( () => last({}) ).to.throw();
        }
    )
})
