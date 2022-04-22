const expect = require('chai').expect;
const isgreaterthanorequal = require('../isgreaterthanorequal');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isgreaterthanorequal()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isgreaterthanorequal(1);
            expectfunction(curried);
            expecttrue( curried(0) );
        }
    )

    it(`should return true if its first argument is numerically greater than or equal to its second argument`,
        function () {
            expecttrue( isgreaterthanorequal(1, 0) );
            expecttrue( isgreaterthanorequal(1.1, 1) );
            expecttrue( isgreaterthanorequal(0, -1) );
            expecttrue( isgreaterthanorequal(1, 0.99) );
            expecttrue( isgreaterthanorequal(1, 1) );
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expecttrue( isgreaterthanorequal(1n, 0n) );
            expecttrue( isgreaterthanorequal(1n, 1n) );
            expecttrue( isgreaterthanorequal(0n, -1n) );
            expecttrue( isgreaterthanorequal(1n, 0) );
            expecttrue( isgreaterthanorequal(42n, 39.45) );
        }
    )

    it(`should return false if its first argument is numerically less than to its second argument`,
        function () {
            expectfalse( isgreaterthanorequal(0, 1) );
            expectfalse( isgreaterthanorequal(1, 1.1) );
            expectfalse( isgreaterthanorequal(-1, 0) );
            expectfalse( isgreaterthanorequal(0.99, 1) );
            expectfalse( isgreaterthanorequal(1n, 2n) );
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically greater than or equal to the second argument`,
        function () {
            expecttrue( isgreaterthanorequal('b', 'a') );
            expecttrue( isgreaterthanorequal('a', 'a') );
            expecttrue( isgreaterthanorequal('aa', 'a') );
            expecttrue( isgreaterthanorequal('9', '8') );
            expecttrue( isgreaterthanorequal('a', '') );
            expecttrue( isgreaterthanorequal('', '') );
        }
    )

    it(`should return the same result as the Javascript >=-operator`,
        function () {
            expectequal( isgreaterthanorequal('b', 1), ('b' >= 1) );
            expectequal( isgreaterthanorequal(1, 'b'), (1 >= 'b') );
            expectequal( isgreaterthanorequal([], '1'), ([] >= '1') );
            expectequal( isgreaterthanorequal('1', []), ('1' >= []) );
            expectequal( isgreaterthanorequal(null, 0), (null >= 0) );
            expectequal( isgreaterthanorequal(0, null), (0 >= null) );
            expectequal( isgreaterthanorequal(NaN, NaN), (NaN >= NaN) );
            expectequal( isgreaterthanorequal(undefined, null), (undefined >= null) );
            expectequal( isgreaterthanorequal(null, undefined), (null >= undefined) );
        }
    )

    it(`should treat null as equal to 0`,
        function () {
            expecttrue( isgreaterthanorequal(null, 0) );
            expecttrue( isgreaterthanorequal(0, null) );
            expecttrue( isgreaterthanorequal(null, -0) );
            expecttrue( isgreaterthanorequal(-0, null) );
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