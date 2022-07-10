const expect = require('chai').expect;
const hasownproperty = require('../src/hasownproperty');

const sentinel = Symbol();

const prototype = { proto:42 };
const object = Object.create(prototype);

object.data = 42;
object[sentinel] = 42;
object.nulldata = null;
object.undefineddata = undefined;
object.nandata = NaN;
object[0] = 42;

describe(`hasownproperty()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = hasownproperty('data');
            expect(curried).to.be.a('function');
            expect( curried( {data:42} ) ).to.be.true;
        }
    )

    it(`should return true if the object has an own property with the specified key`,
        function () {
            expect( hasownproperty('data', object) ).to.be.true;
        }
    )

    it(`should return false if the object does not have an own property with the specified key`,
        function () {
            expect( hasownproperty('nodata', object) ).to.be.false;
        }
    )

    it(`should return false if the object has an inherited property with the specified key`,
        function () {
            expect( hasownproperty('proto', object) ).to.be.false;
        }
    )

    it(`should return false if the object's property has value null, undefined or NaN`,
        function () {
            expect( hasownproperty('nulldata', object) ).to.be.true;
            expect( hasownproperty('undefineddata', object) ).to.be.true;
            expect( hasownproperty('nandata', object) ).to.be.true;
        }
    )

    it(`should work with a symbol key`,
        function () {
            expect( hasownproperty(sentinel, object) ).to.be.true;
        }
    )

    it(`should work with an integer key`,
        function () {
            expect( hasownproperty(0, object) ).to.be.true;
        }
    )

    it(`should throw if the object is null or undefined`,
        function () {
            expect( ()=>hasownproperty('toString', null) ).to.throw();
            expect( ()=>hasownproperty('toString', undefined) ).to.throw();
        }
    )

    it(`should return false if the object is a primitive value`,
        function () {
            expect( hasownproperty('toString', 42 ) ).to.be.false;
            expect( hasownproperty('toString', true ) ).to.be.false;
            expect( hasownproperty('toString', 1n ) ).to.be.false;
            expect( hasownproperty('toString', 1.33 ) ).to.be.false;
            expect( hasownproperty('toString', sentinel ) ).to.be.false;
        }
    )
})
