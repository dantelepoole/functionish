const expect = require('chai').expect;
const iserror = require('../src/types/iserror');

describe(`iserror()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( iserror() ).to.be.false;
        }
    )

    it(`should return true when passed an instance of the Javascript native Error class`,
        function () {
            expect( iserror( new Error() ) ).to.be.true;
        }
    )

    it(`should return true when passed an instance of a sublcass of the Javascript native Error class`,
        function () {
            expect( iserror( new TypeError() ) ).to.be.true;

            class MyError extends Error{}

            expect( iserror( new MyError() ) ).to.be.true;
        }
    )

    it(`should return false when passed any other argument type`,
        function () {
            expect( iserror(42) ).to.be.false;
            expect( iserror(42n) ).to.be.false;
            expect( iserror(null) ).to.be.false;
            expect( iserror(undefined) ).to.be.false;
            expect( iserror({}) ).to.be.false;
            expect( iserror( new Date() ) ).to.be.false;
            expect( iserror([]) ).to.be.false;
            expect( iserror(x => x) ).to.be.false;
            expect( iserror(Symbol()) ).to.be.false;
            expect( iserror('true') ).to.be.false;
        }
    )
})
