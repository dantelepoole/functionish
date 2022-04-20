const expect = require('chai').expect;
const isdeepequal = require('../isdeepequal');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const deepobject1 = {
    a: 'foobar',
    b: {
        c: 'foo',
        d: [{ test: {result:'unknown'} }, true, 42, null, 42n, markersymbol]
    }
}

const clone1 = {
    a: 'foobar',
    b: {
        c: 'foo',
        d: [{ test: {result:'unknown'} }, true, 42, null, 42n, markersymbol]
    }
}

const deepobject2 = {
    a : {
        b: 'foobar',
        c: [1,2, [deepobject1]]
    },
    b: []
}

const clone2 = {
    a : {
        b: 'foobar',
        c: [1,2, [deepobject1]]
    },
    b: []
}

deepobject3 = {}
deepobject3.a = deepobject3;

const clone3 = {};
clone3.a = clone3;

describe(`isdeepequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {

            const curried = isdeepequal(markerobject);
            expectfunction(curried);

            expecttrue( curried(markerobject) );
        }
    )

    it(`should test for strict equality`,
        function () {
            expecttrue( isdeepequal('1','1') );
            expectfalse( isdeepequal('1',1) );
        }
    )

    it(`should return true if the same value or reference is passed for both arguments`,
        function () {
            expecttrue( isdeepequal(markerobject, markerobject) );
            expecttrue( isdeepequal(markerarray, markerarray) );
            expecttrue( isdeepequal(markersymbol, markersymbol) );
            expecttrue( isdeepequal(42, 42) );
            expecttrue( isdeepequal(true, true) );
            expecttrue( isdeepequal(42n, 42n) );
            expecttrue( isdeepequal('foobar', 'foobar') );
            expecttrue( isdeepequal(1.3333, 1.3333) );
            expecttrue( isdeepequal(null, null) );
            expecttrue( isdeepequal(undefined, undefined) );
            expecttrue( isdeepequal(NaN, NaN) );
        }
    )

    it(`should work when the arguments are null, undefined or NaN`,
        function () {
            expecttrue( isdeepequal(null, null) );
            expecttrue( isdeepequal(undefined, undefined) );
            expecttrue( isdeepequal(NaN, NaN) );
            expectfalse( isdeepequal(null, undefined) );
            expectfalse( isdeepequal(undefined, NaN) );
            expectfalse( isdeepequal(NaN, null) );
        }
    )

    it(`should return true for arguments that have the same properties and property-values, recursively`,
        function () {
            expecttrue( isdeepequal(deepobject1, clone1) );
            expecttrue( isdeepequal(deepobject2, clone2) );
        }
    )

    it(`should also work for objects with with circular references`,
        function () {
            expecttrue( isdeepequal(deepobject3, clone3) );
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