const expect = require('chai').expect;
const once = require('../once');

let callcount = 0;

function sum(a,b) {
    callcount += 1;
    return (a+b);
}

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`once()`, function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it(`should return a function`,
        function () {
            expectfunction( once(sum) );
        }
    )

    it(`should run its argument function the first time its returned function is invoked`,
        function () {
            const sumonce = once(sum);
            expectequal( sumonce(1,42), 43 );
            expectequal( 1, callcount );
        }
    )

    it(`should not run its argument function on subsequent invocations of its returned function`,
        function () {
            const sumonce = once(sum);

            expectequal(0, callcount);
            sumonce(1,42);
            expectequal(1, callcount);
            sumonce(1,2);
            expectequal(1, callcount);
            sumonce(3,4);
            expectequal(1, callcount);
        }
    )

    it(`should return the result of the first invocations on subsequent invocations of its returned function`,
        function () {
            const sumonce = once(sum);

            let result = sumonce(1,42);
            expectequal(43, result);

            result = sumonce(53, 17);
            expectequal(43, result);

            result = sumonce(0,0);
            expectequal(43, result);
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