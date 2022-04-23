const expect = require('chai').expect;
const last = require('../last');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];

describe(`last()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return the last item in its argument if its argument is indexable`,
        function () {
            let result = last(numbers1to10);
            expectequal(result, 10);

            result = last('foobar');
            expectequal(result, 'r');
        }
    )

    it(`should return undefined if its argument is empty`,
        function () {
            expectundefined( last([]) );
            expectundefined( last('') );
        }
    )

    it(`should return undefined if its argument is not indexable`,
        function () {
            const result = last(markerobject);
            expectundefined(result);
        }
    )

    it(`should return undefined if its argument is null or undefined`,
        function () {
            expectundefined( last(null) );
            expectundefined( last(undefined) );
            expectundefined( last() );
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