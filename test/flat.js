const flat = require('../flat');
const expect = require('chai').expect;

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const array1dimension = [1,2,3,4,5];
const array2dimensions = [[1,1], [2,2], [3,3], [4,4], [5,5]];
const array3dimensions = [[[1,1]], [[2,2]], [[3,3]], [[4,4]], [[5,5]]];

describe(`flat()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should invoke the flat() method of its second argument with the first argument (depth)`,
        function () {
            let flatdepth = undefined;
            const flattenable = {
                flat(depth) {
                    flatdepth = depth;
                }
            }
            flat(42, flattenable);
            expectequal(flatdepth, 42);
        }
    )

    it(`should throw if its second argument has no flat() method`,
        function () {
            expecttothrow(flat, 42, {});
        }
    )

    it(`if its second argument is an array, it should return a copy of the array flattened by depth number of dimensions`,
        function () {
            let result = flat(1, array1dimension);
            expectdeepequal(result, array1dimension)

            result = flat(1, array2dimensions);
            expectdeepequal(result, [1,1,2,2,3,3,4,4,5,5]);

            result = flat(1, array3dimensions);
            expectdeepequal(result, array2dimensions);

            result = flat(2, array3dimensions);
            expectdeepequal(result, [1,1,2,2,3,3,4,4,5,5]);
        }
    )
    
    it(`should be curried`,
        function () {
            const curried = flat(1);
            expectfunction(curried);
            expectdeepequal( curried(array2dimensions), [1,1,2,2,3,3,4,4,5,5] );
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