const expect = require('chai').expect;
const haskey = require('../src/haskey');

describe(`haskey()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = haskey('foobar');
            expect(curried).to.be.a('function');
            expect( curried({}) ).to.be.false;
        }
    )

    it(`should return true if the target object has a property with the specified key whose value is not undefined`,
        function () {
            expect( haskey('length', []) ).to.be.true;
        }
    )

    it(`should return false if the target object does not have a property with specified key`,
        function () {
            expect( haskey('foobar', []) ).to.be.false;
        }
    )

    it(`should return false if the target object has a property with the specified key whose value is undefined`,
        function () {
            const obj = { foobar:undefined }
            expect( haskey('foobar', obj) ).to.be.false;
        }
    )

    it(`should return false if the target object is null, undefined or NaN`,
        function () {
            expect( haskey('foobar', null) ).to.be.false;
            expect( haskey('foobar', NaN) ).to.be.false;
            expect( haskey('foobar', undefined) ).to.be.false;
        }
    )

    it(`should return false if the target object is a primitive value`,
        function () {
            expect( haskey('foobar', 2) ).to.be.false;
            expect( haskey('foobar', 1n) ).to.be.false;
            expect( haskey('foobar', 1.33) ).to.be.false;
            expect( haskey('foobar', true) ).to.be.false;
        }
    )

    it(`should work with a Symbol key`,
        function () {
            const symbol = Symbol();
            const obj = {};
            obj[symbol] = 42;
            expect( haskey(symbol, obj) ).to.be.true;
        }
    )

    it(`should work with an integer key`,
        function () {
            expect( haskey(0, [1]) ).to.be.true;
        }
    )
})
