const expect = require('chai').expect;
const intersection = require('../intersection');
const isiterable = require('../isiterable');

function toarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

function expectiterable(iterable) {
    expect( isiterable(iterable) ).to.be.true;
}

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
const evennumbers1to10 = [2,4,6,8,10];
const oddnumbers1to10 = [1,3,5,7,9];

describe(`intersection()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should be curried`,
        function () {
            const curried = intersection(numbers1to10);
            expectfunction(curried);

            const result = curried(evennumbers1to10);
            expect( isiterable(result) ).to.be.true;
        }
    )

    it(`should throw if either argument is not iterable`,
        function () {
            expecttothrow(intersection, {}, {});
        }
    )

    it(`should return an iterable`,
        function () {
            expectiterable( intersection(numbers1to10, evennumbers1to10) );
            expectiterable( intersection([], evennumbers1to10) );
            expectiterable( intersection(numbers1to10, []) );
        }
    )

    it(`should return the intersection of its two arguments`,
        function () {
            let result = toarray( intersection(numbers1to10, evennumbers1to10) );
            expectdeepequal(result, evennumbers1to10);

            result = toarray( intersection(oddnumbers1to10, numbers1to10) );
            expectdeepequal(result, oddnumbers1to10);
        }
    )

    it(`should return an iterable without duplicate elements`,
        function () {
            const result = toarray( intersection(numbers1to10, [...evennumbers1to10, ...evennumbers1to10]) );
            expectdeepequal(result, evennumbers1to10);
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