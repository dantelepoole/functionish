const expect = require('chai').expect;
const id = require('../id');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`id()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return its first argument`,
        function () {
            expectequal( id(42), 42 );
        }
    )

    it(`should ignore other arguments than the first one`,
        function () {
            expectequal( id(42, 24, 33), 42 );
        }
    )

    it(`should return undefined if called without arguments`,
        function () {
            expectundefined( id() );
        }
    )

    it(`should work with any type`,
        function () {
            expectequal( id(42), 42 );
            expectequal( id(null), null );
            expectequal( id(undefined), undefined );
            expectequal( id('foobar'), 'foobar' );
            expectequal( id(markerobject), markerobject );
            expectequal( id(markerarray), markerarray );
            expectequal( id(markersymbol), markersymbol );
            expectequal( id(id), id );
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