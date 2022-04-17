const expect = require('chai').expect;
const flatmap = require('../flatmap');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

function double(x) {
    return (x*2);
}

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);

let mapcallcount = 0;

function countingmapfunc(func, x) {
    mapcallcount += 1;
    return func(x);
}

const flatmappable = {
    flatMap(func) {
        return flatmappable;
    }
}

describe(`flatmap()`, function() {

    beforeEach(
        function() {
            mapcallcount = 0;
        }
    )

    it(`should be curried`,
        function () {
            expectfunction( flatmap(double) );
            expectdeepequal( flatmap(double)([1,2,3]), [2,4,6] );
        }
    )

    it(`should invoke pass its first argument to the flatMap() method of its second argument`,
        function () {
            const result = flatmap(double, flatmappable);
            expectequal(result, flatmappable);
        }
    )

    it(`should throw if its second argument has not flatMap() method`,
        function () {
            expecttothrow(flatmap, double, {});
        }
    )

    it(`if passed an array, it should return the equivalent of calling map() followed by flat() on the array`,
        function () {

            function lifttoarrayifnotzero(x) {
                return (x === 0) ? [] : [x];
            }

            const array = [1,2,3,0,5];
            const flatmapresult = flatmap(lifttoarrayifnotzero, array);
            const equivalentresult = array.map(lifttoarrayifnotzero).flat();

            expectdeepequal(flatmapresult, equivalentresult);
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