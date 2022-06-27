const expect = require('chai').expect;
const noterror = require('../noterror');

class FoobarError extends Error {}

describe(`noterror()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if the argument is a native Javascript Error instance`,
        function () {
            expect( noterror(new Error()) ).to.be.false;
            expect( noterror(new TypeError()) ).to.be.false;
            expect( noterror(new FoobarError()) ).to.be.false;
        }
    )

    it(`should return true if the argument is a not native Javascript Error instance`,
        function () {
            expect( noterror({}) ).to.be.true;
            expect( noterror() ).to.be.true;
            expect( noterror(null) ).to.be.true;
            expect( noterror('Error') ).to.be.true;
            expect( noterror(Error) ).to.be.true;
            expect( noterror(FoobarError) ).to.be.true;
        }
    )
})
