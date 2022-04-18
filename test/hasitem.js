const expect = require('chai').expect;
const hasitems = require('../hasitems');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`hasitems()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has a length property that is larger than 0`,
        function () {
            expecttrue( hasitems([1]) );
            expecttrue( hasitems('a') );
            expecttrue( hasitems(hasitems) );
        }
    )

    it(`should return false if its argument has a length property that is less than 1`,
        function () {
            expectfalse( hasitems([]) );
            expectfalse( hasitems( {length:-1} ) );
            expectfalse( hasitems('') );
            expectfalse( hasitems(Symbol) );
        }
    )

    it(`should return false if its argument does not have a length property`,
        function () {
            expectfalse( hasitems({}) );
        }
    )

    it(`should return false if its argument is not an object, string or function`,
        function () {
            expectfalse( hasitems(2) );
            expectfalse( hasitems(true) );
            expectfalse( hasitems(1n) );
            expectfalse( hasitems(1.33) );
        }
    )

    it(`should return false if its argument is null, undefined or NaN`,
        function () {
            expectfalse( hasitems(null) );
            expectfalse( hasitems(undefined) );
            expectfalse( hasitems(NaN) );
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