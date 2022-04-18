const expect = require('chai').expect;
const AbortSignal = require('../AbortSignal');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

let aborteventtriggered = false;
function aborteventhandler(event) {
    aborteventtriggered = (event?.type === 'abort');
}

describe(`AbortSignal`, function() {

    beforeEach(
        function() {
            aborteventtriggered = false;
        }
    )

    it(`should have a static abort-method that returns an aborted AbortSignal instance`,
        function () {

            const signal = AbortSignal.abort();

            expect(signal).to.be.an.instanceof(AbortSignal);
            expecttrue(signal.aborted);
        }
    )

    it(`should have a boolean aborted-property`,
        function () {

            const signal = new AbortSignal();
            expectboolean(signal.aborted);
        }
    )

    it(`should have a dispatchEvent method that triggers an event`,
        function () {

            const signal = new AbortSignal();
            expectfunction(signal.dispatchEvent);

            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expecttrue(aborteventtriggered);
        }
    )

    it(`should have an addEventListener method`,
        function () {

            const signal = new AbortSignal();

            expectfunction(signal.addEventListener);

            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expecttrue(aborteventtriggered);
        }
    )

    it(`should have a removeEventListener method`,
        function () {

            const signal = new AbortSignal();

            expectfunction(signal.removeEventListener);
            
            signal.addEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expecttrue(aborteventtriggered);

            aborteventtriggered = false;
            signal.removeEventListener('abort', aborteventhandler);
            signal.dispatchEvent('abort');
            expectfalse(aborteventtriggered);
        }
    )

    it(`should call its onabort method if one has been defined`,
        function () {

            const signal = new AbortSignal();

            signal.onabort = aborteventhandler;
            expectfunction(signal.onabort);
            
            signal.dispatchEvent('abort');
            expecttrue(aborteventtriggered);
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