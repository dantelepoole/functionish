const expect = require('chai').expect;
const head = require('../head');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const list = [42,24];

describe(`head()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the first item of iterable`,
        function () {
            expectequal( head(list), 42 );
        }
    )

    it(`should return undefined if the iterable is empty`,
        function () {
            expectundefined( head([]) );
        }
    )

    it(`should return the value of iterable's property with the integer key 0 if the iterable is indexable`,
        function () {
            const obj = {}
            obj[0] = 42;
            expectequal( head(obj), 42 );
        }
    )

    it(`should return the first value producdes by the iterable if the iterable is not indexable`,
        function () {
            expectequal( head('foobar'), 'f' );
        }
    )

    it(`should throw if the object is not iterable`,
        function () {
            expecttothrow( head, null );
            expecttothrow( head, undefined );
            expecttothrow( head, {} );
            expecttothrow( head, 42 );
        }
    )

    it(`should throw if it is not passed an argument`,
        function () {
            expecttothrow( head );
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