const expect = require('chai').expect;
const isboolean = require('../isboolean');

describe(`isboolean()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type boolean`,
        function () {
            expect( isboolean(true) ).to.be.true;
            expect( isboolean(false) ).to.be.true;
            expect( isboolean( Boolean(true) ) ).to.be.true;
            expect( isboolean( Boolean(false) ) ).to.be.true;
        }
    )

    it(`should return false if its argument has any other type`,
        function () {
            expect( isboolean(1) ).to.be.false;
            expect( isboolean(null) ).to.be.false;
            expect( isboolean(undefined) ).to.be.false;
            expect( isboolean({}) ).to.be.false;
            expect( isboolean([]) ).to.be.false;
            expect( isboolean( ()=>{} ) ).to.be.false;
            expect( isboolean(Symbol) ).to.be.false;
            expect( isboolean('true') ).to.be.false;
        }
    )

})
