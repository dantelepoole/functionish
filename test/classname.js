const expect = require('chai').expect;
const classname = require('../classname');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`classname()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a primitive type's typename capitalized, except for null and bigint`,
        function () {

            expectequal( classname(true), capitalize(typeof true) );
            expectequal( classname('a'), capitalize(typeof 'a') );
            expectequal( classname(42), capitalize(typeof 42) );
            expectequal( classname(-42), capitalize(typeof -42) );
            expectequal( classname(1.33), capitalize(typeof 1.33) );
            expectequal( classname(undefined), capitalize(typeof undefined) );
        }
    )

    it(`should return 'Null' for a null argument`,
        function () {
            expectequal( classname(null), 'Null' );
        }
    )

    it(`should return 'BigInt' for a bigint argument`,
        function () {
            expectequal( classname(42n), 'BigInt' );
        }
    )

    it(`should return the name of built-in classes`,
        function () {
            expectequal( classname(new Date()), 'Date' );
            expectequal( classname(new Array()), 'Array' );
            expectequal( classname(new Map()), 'Map' );
            expectequal( classname(new Set()), 'Set' );
            expectequal( classname(new Set()), 'Set' );
            expectequal( classname(new RegExp('.*')), 'RegExp' );
        }
    )

    it(`should return 'Function' for a function argument`,
        function () {
            expectequal( classname(()=>{}), 'Function' );
            expectequal( classname(classname), 'Function' );
        }
    )

    it(`should return 'Object' for an object argument`,
        function () {
            expectequal( classname({}), 'Object' );
        }
    )

    it(`should return the value of a custom class' [Symbol.toStringTag] getter`,
        function () {

            class foobar { get [Symbol.toStringTag] () { return 'foobar'; } }
            class Foobar { get [Symbol.toStringTag] () { return 'Foobar'; } }
            
            expectequal( classname(new foobar()), 'foobar' );
            expectequal( classname(new Foobar()), 'Foobar' );
        }
    )

    it(`should return 'Object' if a custom class has no [Symbol.toStringTag] getter`,
        function () {

            class Foobar {}
            expectequal( classname(new Foobar()), 'Object' );
        }
    )

    it(`should return 'Object' for generic objects`,
        function () {
            expectequal( classname({}), 'Object' );
        }
    )
})

function capitalize(string) {

    string = String(string ?? '');
    return string[0].toUpperCase() + string.slice(1);
}

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