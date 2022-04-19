const expect = require('chai').expect;
const hasownproperty = require('../hasownproperty');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const prototype = { proto:42 };
const object = Object.create(prototype);

object.data = 42;
object[markersymbol] = 42;
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
            expectfunction(curried);
            expecttrue( curried( {data:42} ) );
        }
    )

    it(`should return true if the object has an own property with the specified key`,
        function () {
            expecttrue( hasownproperty('data', object) );
        }
    )

    it(`should return false if the object does not have an own property with the specified key`,
        function () {
            expectfalse( hasownproperty('nodata', object) );
        }
    )

    it(`should return false if the object does has an inherited property with the specified key`,
        function () {
            expectfalse( hasownproperty('proto', object) );
        }
    )

    it(`should return true if the object's property has value null, undefined or NaN`,
        function () {
            expecttrue( hasownproperty('nulldata', object) );
            expecttrue( hasownproperty('undefineddata', object) );
            expecttrue( hasownproperty('nandata', object) );
        }
    )

    it(`should work with a symbol key`,
        function () {
            expecttrue( hasownproperty(markersymbol, object) );
        }
    )

    it(`should work with an integer key`,
        function () {
            expecttrue( hasownproperty(0, object) );
        }
    )

    it(`should throw if the object is null or undefined`,
        function () {
            expecttothrow( hasownproperty, 'toString', null );
            expecttothrow( hasownproperty, 'toString', undefined );
        }
    )

    it(`should return false if the object is a primitive value`,
        function () {
            expectfalse( hasownproperty('toString', 42 ) );
            expectfalse( hasownproperty('toString', true ) );
            expectfalse( hasownproperty('toString', 1n ) );
            expectfalse( hasownproperty('toString', 1.33 ) );
            expectfalse( hasownproperty('toString', markersymbol ) );
        }
    )
})

function countarguments(...args) {
    return args.length;
}

function returnarguments(...args) {
    return args;
}

function expecttothrow(func, ...args) {
    expect( () => func(...args) ).to.throw();
}

function expectnottothrow(func, ...args) {
    expect( () => func(...args) ).to.not.throw();
}

function expectequal(value1, value2) {
    expect(value1).to.be.equal(value2);
}

function expectdeepequal(value1, value2) {
    expect(value1).to.be.deep.equal(value2);
}

function expectnotequal(value1, value2) {
    expect(value1).to.be.not.equal(value2);
}

function expectnotdeepequal(value1, value2) {
    expect(value1).to.be.not.deep.equal(value2);
}

function expectclone(value1, value2) {
    expect(value1).to.be.deep.equal(value2);
    expect(value1).to.be.not.equal(value2);
}

function expectnull(value) {
    expect(value).to.be.null;
}

function expectundefined(value) {
    expect(value).to.be.undefined;
}

function expectnan(value) {
    expect(value).to.be.NaN;
}

function expectfalsy( value ) {
    expect( !! value ).to.be.false;
}

function expectfalse(value) {
    expect(value).to.be.false;
}

function expecttrue(value) {
    expect(value).to.be.true;
}

function expecttruthy(value) {
    expect( !! value ).to.be.true;
}

function expecttype(type, value) {
    expect(value).to.be.a(type);
} 

const expectarray = expecttype.bind(null, 'array');
const expectfunction = expecttype.bind(null, 'function');
const expectnumber = expecttype.bind(null, 'number');
const expectstring = expecttype.bind(null, 'string');
const expectobject = expecttype.bind(null, 'object');
const expectboolean = expecttype.bind(null, 'boolean');
const expectsymbol = expecttype.bind(null, 'symbol');