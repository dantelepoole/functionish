const expect = require('chai').expect;
const pluck = require('../src/pluck');

const foundation = {
    title : 'Foundation',
    characters: ['Hari Seldon', 'The Mule', 'Bel Riose'],
    author : {
        name : 'Isaac Asimov',
        birth : {
            day : 2,
            month : 'January',
            year : 1920,
            country : {
                name : 'Russia'
            }
        }
    },
    get [Symbol.toStringTag]() {
        return 'Book';
    }
}

describe(`pluck()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const plucktitle = pluck('title');
            expect(plucktitle).to.be.a('function');
            expect( plucktitle(foundation) ).to.be.a('string');
        }
    )

    it(`should return the value of the property at the specified path`,
        function () {
            const title = pluck('title', foundation);
            expect(title).to.be.equal(foundation.title)
        }
    )

    it(`should return undefined if the property at the specified path does not exist`,
        function () {
            const subtitle = pluck('subtitle', foundation);
            expect(subtitle).to.be.undefined;
        }
    )

    it(`should work with non-string keys`,
        function () {
            const tostringtag = pluck(Symbol.toStringTag, foundation);
            expect(tostringtag).to.be.equal('Book');

            const obj = { [42]:42 }
            const result = pluck(42, obj);
            expect(result).to.be.equal(42);
        }
    )

    it(`should resolve composite keys to multiple levels deep`,
        function () {
            const countryname = pluck('author.birth.country.name', foundation);
            expect(countryname).to.be.equal('Russia');
        }
    )
})