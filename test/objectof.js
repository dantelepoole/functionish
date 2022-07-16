const expect = require('chai').expect;
const objectof = require('../objectof');

describe(`objectof()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {

            const curried = objectof('foo');
            expect(curried).to.be.a('function');
            expect(curried('bar')).to.be.an('object');
        }
    )


    it(`should return a new object with a single property with the specified key and value`,
        function () {

            const obj = objectof('foo', 'bar');
            expect(obj).to.be.deep.equal( {foo:'bar'} );
        }
    )

    it(`convert a non-string key to a string before setting the property`,
        function () {
            expect( Object.keys( objectof(42, 42) ).includes('42') ).to.be.true;
            expect( Object.keys( objectof(null, null) ).includes('null') ).to.be.true;
        }
    )
})
