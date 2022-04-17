const expect = require('chai').expect;
const findindex = require('../findindex');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const iseven = x => (x%2) === 0;
const isodd = x => (x%2) === 1;
const ismarkerobject = x => (x === markerobject);
const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

let predicatecallcount = 0;
function countingpredicate(predicate, x) {
    predicatecallcount += 1;
    return predicate(x);
}

const findable = {
    findIndex(predicate) {
        return findable;
    }
}

describe(`findindex()`, function() {

    beforeEach(
        function() {
            predicatecallcount = 0;
        }
    )

    it(`should be curried`,
        function () {
            expectfunction( findindex(iseven) );
            expectequal( findindex(iseven)(numbers1to10), 1 );
        }
    )

    it(`should return the result of calling the findindex() method of its second argument`,
        function () {
            const result = findindex(iseven, findable);
            expectequal(result, findable);
        }
    )

    it(`should throw if its second argument does not have a findindex() method`,
        function () {
            expecttothrow(findindex, iseven, {});
        }
    )

    it(`should pass the findindex() method of its second argument one and only one argument`,
        function () {
            const predicate = (...args) => { if( args.length !== 1 ) throw new Error(`received ${args.length} arguments`) }
            expectnottothrow(findindex, predicate, numbers1to10);
        }
    )

    it(`if passed an array, it should return the index of the first item in the array for which the predicate returns true`,
        function () {
            expectequal( 1, findindex(iseven, numbers1to10) );
            expectequal( 0, findindex(isodd, numbers1to10) );
            expectequal( 4, findindex(ismarkerobject, [1,2,3,4,markerobject,5,6,7]) );
        }
    )

    it(`if passed an array, it should return -1 if the predicate returns false for all items in the array`,
        function () {
            expectequal( -1, findindex(iseven, [1,3,5,7,9]) );
        }
    )

    it(`if passed an array, it should return undefined if the array is empty`,
        function () {
            expectequal( -1, findindex(iseven, []) );
        }
    )

    it(`if passed an array, it should call the predicate for each item in the array`,
        function () {
            const predicate = countingpredicate.bind(null, iseven);
            const result = findindex( predicate, [1,3,5,7,9] );
            expectequal(-1, result);
            expectequal(predicatecallcount, 5);
        }
    )

    it(`if passed an array, it should stop passing further items to the predicate once the predicate returns true`,
        function () {
            const predicate = countingpredicate.bind(null, iseven);
            const result = findindex( predicate, [1,3,5,8,9] );
            expectequal(predicatecallcount, 4);
            expectequal(3, result);
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