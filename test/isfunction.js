const expect = require('chai').expect;
const isfunction = require('../src/types/isfunction');

describe(`isfunction()`, function() {

    it(`should return false when called without arguments`,
        function () {
            expect( isfunction() ).to.be.false;
        }
    )


    it(`should return true if its argument has type 'function'`,
        function () {
            expect( isfunction(expect) ).to.be.true;
            expect( isfunction(x => x) ).to.be.true;
            expect( isfunction(isfunction) ).to.be.true;
            expect( isfunction(function(){}) ).to.be.true;
            expect( isfunction(function func() {}) ).to.be.true;
        }
    )

    it(`should return true if its argument is a class`,
        function () {
            expect( isfunction(Date) ).to.be.true;
            expect( isfunction(Array) ).to.be.true;

            class MyClass {}

            expect( isfunction(MyClass) ).to.be.true;
        }
    )

    it(`should return false if its argument has a type other than 'function'`,
        function () {

            expect( isfunction(42) ).to.be.false;
            expect( isfunction(42n) ).to.be.false;
            expect( isfunction(null) ).to.be.false;
            expect( isfunction(undefined) ).to.be.false;
            expect( isfunction({}) ).to.be.false;
            expect( isfunction( new Date() ) ).to.be.false;
            expect( isfunction([]) ).to.be.false;
            expect( isfunction(Symbol()) ).to.be.false;
            expect( isfunction('true') ).to.be.false;
        }
    )
})
