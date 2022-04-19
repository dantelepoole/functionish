const expect = require('chai').expect;
const haskey = require('../haskey');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`haskey()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = haskey('foobar');
            expectfunction(curried);
            expectfalse( curried({}) );
        }
    )

    it(`should return true if its second argument has a property with the key of its first argument that is not undefined`,
        function () {
            expecttrue( haskey('length', []) );
        }
    )

    it(`should return false if its second argument does not have a property with the key of its first argument`,
        function () {
            expectfalse( haskey('foobar', []) );
        }
    )

    it(`should return false if its second argument has a property with the key of its first argument that is undefined`,
        function () {
            const obj = { foobar:undefined }
            expectfalse( haskey('foobar', obj) );
        }
    )

    it(`should return false if its second argument is null, undefined or NaN`,
        function () {
            expectfalse( haskey('foobar', null) );
            expectfalse( haskey('foobar', undefined) );
            expectfalse( haskey('foobar', NaN) );
        }
    )

    it(`should return false if its second argument is a primitive value`,
        function () {
            expectfalse( haskey('foobar', 2) );
            expectfalse( haskey('foobar', true) );
            expectfalse( haskey('foobar', 1n) );
            expectfalse( haskey('foobar', 1.33) );
        }
    )

    it(`should work with a Symbol key`,
        function () {
            const symbol = Symbol();
            const obj = {};
            obj[symbol] = 42;
            expecttrue( haskey(symbol, obj) );
        }
    )

    it(`should work with an integer key`,
        function () {
            expecttrue( haskey(0, [1]) );
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