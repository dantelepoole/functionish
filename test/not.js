const expect = require('chai').expect;
const not = require('../not');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`not()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the logical complement of its argument if its argument is not a function`,
        function () {

            expectfalse( not(true) );
            expectfalse( not('false') );
            expectfalse( not([]) );
            expectfalse( not({}) );
            expectfalse( not(42) );
            expectfalse( not(42n) );
            
            expecttrue( not(false) );
            expecttrue( not('') );
            expecttrue( not(null) );
            expecttrue( not(undefined) );
            expecttrue( not(NaN) );
            expecttrue( not(0) );
            expecttrue( not(-0) );
        }
    )

    it(`if its argument is a function, it should return a function that returns the logical complement of passing its arguments to the argument function`,
        function () {

            function iseven(x) { return (x%2) === 0 }
            function isodd(x) { return (x%2) === 1 }

            expectfalse( not(iseven)(0) );
            expecttrue( not(iseven)(1) );
            expectfalse( not(isodd)(1) );
            expecttrue( not(isodd)(0) );
            
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