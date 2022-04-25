const expect = require('chai').expect;
const length = require('../length');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`length()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the value of the length-property of its argument`,
        function () {
            expectequal( length([]), 0 );
            expectequal( length([1,2,3]), 3 );
            expectequal( length(''), 0 );
            expectequal( length('foobar'), 6 );
            expectequal( length( {length:42} ), 42 );
            expectequal( length( {length:'foobar'} ), 'foobar' );
        }
    )

    it(`should return undefined if its argument has no length-property`,
        function () {
            expectundefined( length(markerobject) );
            expectundefined( length(true) );
            expectundefined( length(42) );
            expectundefined( length( new Map() ) );
            expectundefined( length( new Set() ) );
        }
    )

    it(`should return undefined if its argument is null or undefined`,
        function () {
            expectundefined( length(null) );
            expectundefined( length(undefined) );
            expectundefined( length() );
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