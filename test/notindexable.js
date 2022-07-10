const expect = require('chai').expect;
const notindexable = require('../src/notindexable');

describe(`notindexable()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is an object with a numeric own length-property of 0`,
        function () {

            const obj = {
                length : 0
            }

            expect( notindexable(obj) ).to.be.false;
        }
    )

    it(`should return true if its argument has a non-numeric length-property or no length-property at all`,
        function () {

            const obj = {
                length : 'foobar'
            }

            expect( notindexable(obj) ).to.be.true;
            expect( notindexable({}) ).to.be.true;
        }
    )

    it(`should return false if its argument is an object with an own length-property larger than 0 and with own properties for key 0 and the key (length - 1)`,
        function () {

            const obj = {
                length : 42,
                [0]    : true,
                [41]   : true
            }

            expect( notindexable(obj) ).to.be.false;
        }
    )
})
