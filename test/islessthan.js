const expect = require('chai').expect;
const islessthan = require('../islessthan');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`islessthan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = islessthan(0);
            expectfunction(curried);
            expecttrue( curried(1) );
        }
    )

    it(`should return true if its first argument is numerically less than its second argument`,
        function () {
            expecttrue( islessthan(0, 1) );
            expecttrue( islessthan(1, 1.1) );
            expecttrue( islessthan(-1, 0) );
            expecttrue( islessthan(0.99, 1) );
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expecttrue( islessthan(0n, 1n) );
            expecttrue( islessthan(-1n, 0n) );
            expecttrue( islessthan(0, 1n) );
            expecttrue( islessthan(39.45, 42n) );
        }
    )

    it(`should return false if its first argument is numerically less than its second argument`,
        function () {
            expectfalse( islessthan(1, 0) );
            expectfalse( islessthan(1.1, 1) );
            expectfalse( islessthan(0, -1) );
            expectfalse( islessthan(1, 0.99) );
            expectfalse( islessthan(0,0) );
            expectfalse( islessthan(1.0, 1) );
            expectfalse( islessthan(1.0, 1.0) );
            expectfalse( islessthan(1n, 1n) );
            expectfalse( islessthan(2n, 1n) );
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically less than the second argument`,
        function () {
            expecttrue( islessthan('1', 'b') );
            expecttrue( islessthan('a', 'aa') );
            expecttrue( islessthan('8', '9') );
            expecttrue( islessthan('', 'a') );
        }
    )

    it(`should return convert strings to numbers if possible`,
        function () {
            expecttrue( islessthan(1, '8') );
            expectfalse( islessthan('8', 1) );
        }
    )


    it(`should return the same result as the Javascript >-operator`,
        function () {
            expectequal( islessthan('b', 1), ('b' < 1) );
            expectequal( islessthan(1, 'b'), (1 < 'b') );
            expectequal( islessthan([], '1'), ([] < '1') );
            expectequal( islessthan('1', []), ('1' < []) );
            expectequal( islessthan(null, 0), (null < 0) );
            expectequal( islessthan(0, null), (0 < null) );
            expectequal( islessthan(NaN, NaN), (NaN < NaN) );
            expectequal( islessthan(undefined, null), (undefined < null) );
            expectequal( islessthan(null, undefined), (null < undefined) );
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