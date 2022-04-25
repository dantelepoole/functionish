const expect = require('chai').expect;
const pmap = require('../pmap');

function double(x) {
    return (x*2);
}

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`pmap()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = pmap(double);
            expectfunction(curried);

            expecttype( 'Promise', curried(Promise.resolve(42)) );
        }
    )

    it(`should return a promise`,
        function () {
            expect( pmap(double, Promise.resolve(42)) ).to.be.a('Promise');
        }
    )

    it(`should resolve to the result of applying its first argument to the resolve value of its second argument`,
        function () {
            const p = Promise.resolve(42);
            const mapped = pmap(double, p);
            return pexpectequal(84, mapped);
        }
    )

    it(`should throw if its second argument is not thennable`,
        function () {
            expecttothrow( pmap, double, {});
        }
    )
})

function pexpectequal(value, promise) {

    return promise.then(
        x => expectequal(value, x)
    )
}

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