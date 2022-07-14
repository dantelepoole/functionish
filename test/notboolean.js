const expect = require('chai').expect;
const notboolean = require('../notboolean');

describe(`notboolean()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type boolean`,
        function () {
            expect( notboolean(true) ).to.be.false;
            expect( notboolean(false) ).to.be.false;
            expect( notboolean( Boolean(true) ) ).to.be.false;
            expect( notboolean( Boolean(false) ) ).to.be.false;
        }
    )

    it(`should return true if its argument has any other type`,
        function () {
            expect( notboolean(1) ).to.be.true;
            expect( notboolean(null) ).to.be.true;
            expect( notboolean(undefined) ).to.be.true;
            expect( notboolean({}) ).to.be.true;
            expect( notboolean([]) ).to.be.true;
            expect( notboolean( ()=>{} ) ).to.be.true;
            expect( notboolean(Symbol) ).to.be.true;
            expect( notboolean('true') ).to.be.true;
        }
    )

})
