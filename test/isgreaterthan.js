const expect = require('chai').expect;
const isgreaterthan = require('../isgreaterthan');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isgreaterthan()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = isgreaterthan(1);
            expectfunction(curried);
            expecttrue( curried(0) );
        }
    )

    it(`should return true if its first argument is numerically greater than its second argument`,
        function () {
            expecttrue( isgreaterthan(1, 0) );
            expecttrue( isgreaterthan(1.1, 1) );
            expecttrue( isgreaterthan(0, -1) );
            expecttrue( isgreaterthan(1, 0.99) );
        }
    )

    it(`should return work with bigints for either or both arguments`,
        function () {
            expecttrue( isgreaterthan(1n, 0n) );
            expecttrue( isgreaterthan(0n, -1n) );
            expecttrue( isgreaterthan(1n, 0) );
            expecttrue( isgreaterthan(42n, 39.45) );
        }
    )

    it(`should return false if its first argument is numerically less than or equal to its second argument`,
        function () {
            expectfalse( isgreaterthan(0, 1) );
            expectfalse( isgreaterthan(1, 1.1) );
            expectfalse( isgreaterthan(-1, 0) );
            expectfalse( isgreaterthan(0.99, 1) );
            expectfalse( isgreaterthan(0,0) );
            expectfalse( isgreaterthan(1, 1.0) );
            expectfalse( isgreaterthan(1.0, 1.0) );
            expectfalse( isgreaterthan(1n, 1n) );
            expectfalse( isgreaterthan(1n, 2n) );
        }
    )

    it(`should return true if both arguments are strings and the first argument is alphanumerically greater than the second argument`,
        function () {
            expecttrue( isgreaterthan('b', 'a') );
            expecttrue( isgreaterthan('aa', 'a') );
            expecttrue( isgreaterthan('9', '8') );
            expecttrue( isgreaterthan('a', '') );
        }
    )

    it(`should return false if the arguments are not both either strings or numeric types`,
        function () {
            expectfalse( isgreaterthan('b', 1) );
            expectfalse( isgreaterthan(1, '8') );
            expectfalse( isgreaterthan([], '1') );
            expectfalse( isgreaterthan(null, 0) );
            expectfalse( isgreaterthan(NaN, NaN) );
            expectfalse( isgreaterthan(undefined, null) );
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