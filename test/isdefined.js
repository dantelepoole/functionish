const expect = require('chai').expect;
const isdefined = require('../isdefined');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isdefined()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return false if its argument is null`,
        function () {
            expectfalse( isdefined(null) )
        }
    )

    it(`should return false if its argument is undefined`,
        function () {
            expectfalse( isdefined(undefined) )
        }
    )

    it(`should return false if its argument is NaN`,
        function () {
            expectfalse( isdefined(NaN) )
        }
    )

    it(`should return true if its argument is any other value`,
        function () {
            expecttrue( isdefined('') );
            expecttrue( isdefined(0) );
            expecttrue( isdefined(false) );
            expecttrue( isdefined(-0) );
            expecttrue( isdefined(0.00000000001) );
            expecttrue( isdefined(0n) );
            expecttrue( isdefined(markerobject) );
            expecttrue( isdefined(markerarray) );
            expecttrue( isdefined(markersymbol) );
            expecttrue( isdefined( ()=>{} ) );
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