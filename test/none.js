const expect = require('chai').expect;
const none = require('../none');

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

let callcount = 0;
function isnumber(x) { callcount += 1; return typeof x ==='number'; };
function isstring(x) { callcount += 1; return typeof x === 'string' };
function isgreaterthan(num, x) { callcount += 1; return (x > num) };

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`none()`, function() {

    beforeEach(
        function() {
            callcount = 0;
        }
    )

    it('should return true for an empty list argument',
        function() {
            expect( none(isnumber, []) ).to.be.true;
        }
    )

    it('should return true if its predicate argument returns false for each item in the list',
        function() {
            expect( none(isstring, numbers1to10) ).to.be.true;
        }
    )

    it('should return false if its predicate argument returns true for one item in the list',
        function() {

            const isgreaterthan9 = isgreaterthan.bind(null, 9);
            expect( none(isgreaterthan9, numbers1to10) ).to.be.false;
        }
    )

    it('should run its predicate argument once for each item in the list if the predicate returns false for each item',
        function() {
            const result = none(isstring, numbers1to10);
            expect( result ).to.be.true;
            expect( callcount ).to.be.equal(10);
        }
    )

    it('should be short-circuited',
        function() {
            const isgreaterthan4 = isgreaterthan.bind(null, 4);
            const result = none(isgreaterthan4, numbers1to10);
            expect( result ).to.be.false;
            expect( callcount ).to.be.equal(5);
        }
    )

    it('should be curried with arity 2',
        function () {
            let result = none(isstring);
            expect(result).to.be.a('function');
            result = result(numbers1to10)
            expect(result).to.be.true;
        }
    )

    it('should throw if its first argument is not a function',
        function () {
            expect( () => none(42, [1,2,3]) ).to.throw();
        }
    )

    it('should throw if its second argument is not an array',
        function () {
            expect( () => none(isnumber, 42) ).to.throw();
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