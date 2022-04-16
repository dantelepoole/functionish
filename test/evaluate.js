const expect = require('chai').expect;
const evaluate = require('../evaluate');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`evaluate()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return its first argument if it is not a function`,
        function () {
            expectequal( evaluate(42), 42 );
            expectequal( evaluate(markerobject), markerobject );
            expectequal( evaluate(markerarray), markerarray );
            expectequal( evaluate(false), false );
            expectequal( evaluate('foobar'), 'foobar' );
            expectequal( evaluate(42n), 42n );
            expectequal( evaluate(null), null );
            expectequal( evaluate(undefined), undefined );
            expectnan( evaluate(NaN) );
            expectequal( evaluate(markersymbol), markersymbol );
        }
    )

    it(`should ignore its second and following arguments if its first argument is not a function`,
        function () {
            expectequal( evaluate(42, 1,2,3), 42 );
            expectequal( evaluate(markerobject, 1,2,3), markerobject );
            expectequal( evaluate(markerarray, 1,2,3), markerarray );
            expectequal( evaluate(false, 1,2,3), false );
            expectequal( evaluate('foobar', 1,2,3), 'foobar' );
            expectequal( evaluate(42n, 1,2,3), 42n );
            expectequal( evaluate(null, 1,2,3), null );
            expectequal( evaluate(undefined, 1,2,3), undefined );
            expectnan( evaluate(NaN, 1,2,3) );
            expectequal( evaluate(markersymbol, 1,2,3), markersymbol );
        }
    )

    it(`should invoke its first argument if it is a function`,
        function () {
            expectequal( evaluate(countarguments), 0 );
            expectdeepequal( evaluate(returnarguments), [] );
        }
    )

    it(`should invoke pass its second and following arguments to its first argument if its first argument is a function`,
        function () {
            expectdeepequal( evaluate(returnarguments, 1,2,3), [1,2,3] );
            expectdeepequal( evaluate(returnarguments, 'foobar'), ['foobar'] );
            expectdeepequal( evaluate(returnarguments, null, undefined, NaN), [null, undefined, NaN] );
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

function expectdeepequalbutnotequal(value1, value2) {
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
