const expect = require('chai').expect;
const isnumber = require('../isnumber');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isnumber()`, function() {1/0

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type number`,
        function () {
            expecttrue( isnumber(0) );
            expecttrue( isnumber(1.33) );
            expecttrue( isnumber(-1) );
            expecttrue( isnumber( 1/3 ) );
            expecttrue( isnumber(Number.MAX_SAFE_INTEGER) );
            expecttrue( isnumber(Number.MAX_VALUE) );
            expecttrue( isnumber(Number.MIN_SAFE_INTEGER) );
            expecttrue( isnumber(Number.MIN_VALUE) );
            expecttrue( isnumber(Number.EPSILON) );
            expecttrue( isnumber(Infinity) );
            expecttrue( isnumber(Number.POSITIVE_INFINITY) );
            expecttrue( isnumber(Number.NEGATIVE_INFINITY) );
        }
    )

    it(`should return false if its argument is NaN`,
        function () {
            expectfalse( isnumber(NaN) );
        }
    )

    it(`should return false if its argument has a type other than number`,
        function () {
            expectfalse( isnumber('1') );
            expectfalse( isnumber(false) );
            expectfalse( isnumber({}) );
            expectfalse( isnumber([]) );
            expectfalse( isnumber( ()=>{} ) );
        }
    )

    it(`should return false if its argument has type bigint`,
        function () {
            expectfalse( isnumber(0n) );
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