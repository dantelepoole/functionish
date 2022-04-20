const expect = require('chai').expect;
const isempty = require('../isempty');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`isempty()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has a falsy value`,
        function () {
            expecttrue( isempty(false) );
            expecttrue( isempty(null) );
            expecttrue( isempty(undefined) );
            expecttrue( isempty(0) );
            expecttrue( isempty(-0) );
            expecttrue( isempty(0n) );
            expecttrue( isempty(NaN) );
            expecttrue( isempty('') );
        }
    )

    it(`should return true if its argument has a truthy value and does not have a length-property with value 0`,
        function () {
            expectfalse( isempty(true) );
            expectfalse( isempty({}) );
            expectfalse( isempty(1) );
            expectfalse( isempty(-1) );
            expectfalse( isempty(1n) );
            expectfalse( isempty(' ') );
            expectfalse( isempty( (a,b) => (a+b) ) );
        }
    )

    it(`should return true if its argument has a length-property that is equal to 0`,
        function () {
            expecttrue( isempty([]) );
            expecttrue( isempty('') );
            expecttrue( isempty( {length:0} ));
        }
    )

    it(`should return false if its argument does not have a length-property`,
        function () {
            expectfalse( isempty(markerobject) );
        }
    )

    it(`should return false if its argument's length-property is not equal to 0`,
        function () {
            expectfalse( isempty( { length:-1 } ) );
            expectfalse( isempty( { length:undefined } ) );
            expectfalse( isempty( { length:0n } ) );
            expectfalse( isempty( { length:'0' } ) );
            expectfalse( isempty( { length:NaN } ) );
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