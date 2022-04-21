const expect = require('chai').expect;
const isequal = require('../isequal');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isequal(42);
            expectfunction(curried);
            expecttrue( isequal(42, 42) );
        }
    )

    it(`should compare with strict equality`,
        function () {
            expecttrue( isequal(42, 42) );
            expecttrue( isequal(42, 42.0) );
            expecttrue( isequal(markerobject, markerobject) );
            expecttrue( isequal(markerarray, markerarray) );
            expecttrue( isequal(markersymbol, markersymbol) );
            expecttrue( isequal(isequal, isequal) );
            expecttrue( isequal(null, null) );
            expecttrue( isequal(undefined, undefined) );

            expectfalse( isequal(42.0, 42.01) );
            expectfalse( isequal([], []) );
            expectfalse( isequal({}, {}) );
            expectfalse( isequal( ()=>{}, ()=>{} ) );
            expectfalse( isequal(null, undefined) );
            expectfalse( isequal(undefined, NaN) );
            expectfalse( isequal(NaN, null) );
        }
    )

    it(`should return false if either argument is NaN`,
        function () {
            expectfalse( isequal(NaN, NaN) );
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