const expect = require('chai').expect;
const filter = require('../filter');
const isiterable = require('../isiterable');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const numbers1to10 = Object.freeze([1,2,3,4,5,6,7,8,9,10]);
const iseven = x => (x%2) === 0;
const isodd = x => (x%2) === 1;
const alwaystrue = () => true;

let filterablecallcount = 0;

const filterableobject = {
    filter(predicate) {
        filterablecallcount += 1;
        return filterableobject;
    }
}

describe(`filter()`, function() {

    beforeEach(
        function() {
            filterablecallcount = 0;
        }
    )

    it(`should be curried`,
        function () {
            expectfunction( filter(iseven) );
            expectdeepequal( filter(iseven, numbers1to10), [2,4,6,8,10] );
        }
    )

    it(`should invoke the filter()-method of its second argument`,
        function () {
            const result = filter(iseven, filterableobject);
            expectequal( result, filterableobject );
            expectequal( filterablecallcount, 1 );
        }
    )

    it(`should return an iterable if its second argument does not have a filter()-method but is iterable`,
        function () {
            const islowercase = x => (x === x.toLowerCase());
            const result = filter(islowercase, 'foobar');
            expect( isiterable(result) ).to.be.true;
        }
    )

    it(`should ensure that one and only one argument is passed to the predicate function`,
        function () {
            const predicate = (...args) => { if (args.length !== 1) throw new Error(`received ${args.length} arguments`)}
            expectnottothrow( filter, predicate, numbers1to10 );
        }
    )

    it(`if passed an array, it should return a new array with only those items for which predicate returns true`,
        function () {
            expectdeepequal( filter(iseven, numbers1to10), [2,4,6,8,10] );
            expectdeepequal( filter(alwaystrue, numbers1to10), numbers1to10 );
            expectnotequal( filter(alwaystrue, numbers1to10), numbers1to10 );
        }
    )

    it(`if passed an iterable, it should return a new iterable the produces only those items for which predicate returns true`,
        function () {
            const islowercase = x => (x === x.toLowerCase());
            const result = Array.from( filter(islowercase, 'FoObAr') );
            expect(result).to.be.deep.equal( ['o','b', 'r'] );
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