const expect = require('chai').expect;
const isfunction = require('../isfunction');

class FoobarClass {}

class SubFoobarClass extends FoobarClass {}

describe(`isfunction()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type 'function'`,
        function () {
            expect( isfunction(expect) ).to.be.true;
            expect( isfunction(()=>{}) ).to.be.true;
            expect( isfunction(isfunction) ).to.be.true;
            expect( isfunction(function(){}) ).to.be.true;
            expect( isfunction(function func() {}) ).to.be.true;
        }
    )

    it(`should return true if its argument is a class`,
        function () {
            expect( isfunction(FoobarClass) ).to.be.true;
            expect( isfunction(SubFoobarClass) ).to.be.true;
            expect( isfunction(Error) ).to.be.true;
            expect( isfunction(Date) ).to.be.true;
        }
    )

    it(`should return true if its argument has a type other than 'function'`,
        function () {

            expect( isfunction(true) ).to.be.false;
            expect( isfunction(0) ).to.be.false;
            expect( isfunction(1) ).to.be.false;
            expect( isfunction(-0) ).to.be.false;
            expect( isfunction(42n) ).to.be.false;
            expect( isfunction('function') ).to.be.false;
            expect( isfunction('') ).to.be.false;
            expect( isfunction({}) ).to.be.false;
            expect( isfunction([]) ).to.be.false;
            expect( isfunction(Symbol()) ).to.be.false;
        }
    )
})
