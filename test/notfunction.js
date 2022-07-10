const expect = require('chai').expect;
const notfunction = require('../src/notfunction');

describe(`notfunction()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument has type 'function'`,
        function () {
            expect( notfunction(expect) ).to.be.false;
            expect( notfunction(()=>{}) ).to.be.false;
            expect( notfunction(notfunction) ).to.be.false;
            expect( notfunction(function(){}) ).to.be.false;
            expect( notfunction(function foobar(){}) ).to.be.false;
        }
    )

    it(`should return false if its argument is a class`,
        function () {
            expect( notfunction(class Foobar{}) ).to.be.false;
            expect( notfunction(Error) ).to.be.false;
        }
    )

    it(`should return true if its argument has a type other than 'function'`,
        function () {

            expect( notfunction(true) ).to.be.true;
            expect( notfunction(0) ).to.be.true;
            expect( notfunction(42) ).to.be.true;
            expect( notfunction(-0) ).to.be.true;
            expect( notfunction(42n) ).to.be.true;
            expect( notfunction('function') ).to.be.true;
            expect( notfunction('') ).to.be.true;
            expect( notfunction({}) ).to.be.true;
            expect( notfunction([]) ).to.be.true;
            expect( notfunction(Symbol()) ).to.be.true;
        }
    )
})
