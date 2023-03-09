const expect = require('chai').expect;
const notpromise = require('../notpromise');

describe(`notpromise()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if the argument is a native Javascript Promise`,
        function () {
            expect( notpromise( Promise.resolve() ) ).to.be.false;
        }
    )

    it(`should return true if the argument is not a native Javascript Promise`,
        function () {
            expect( notpromise() ).to.be.true;
            expect( notpromise(null) ).to.be.true;
            expect( notpromise(42) ).to.be.true;
            expect( notpromise(Promise) ).to.be.true;
            expect( notpromise({}) ).to.be.true;
            expect( notpromise([]) ).to.be.true;
            expect( notpromise('foobar') ).to.be.true;
        }
    )
})
