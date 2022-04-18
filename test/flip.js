const expect = require('chai').expect;
const flip = require('../flip');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`flip()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a function`,
        function () {
            expectfunction( flip(returnarguments) );
        }
    )

    it(`should return a function that receives its first two arguments in reverse order`,
        function () {
            
            const flipped = flip(returnarguments);
            const result = flipped(1,2);

            expectdeepequal(result, [2,1]);
        }
    )

    it(`should receive no arguments if no arguments are passed to its returned function`,
        function () {
            
            const flipped = flip(returnarguments);
            const result = flipped();

            expectdeepequal(result, []);
        }
    )

    it(`if its returned function is passed one argument, it should received undefined and that one argument`,
        function () {
            
            const flipped = flip(returnarguments);
            const result = flipped(42);

            expectdeepequal(result, [undefined, 42]);
        }
    )

    it(`if its returned function is passed three or more arguments, it should receive all arguments with the first two in reverse order`,
        function () {
            
            const flipped = flip(returnarguments);
            const result = flipped(1,2,3,4,5);

            expectdeepequal(result, [2,1,3,4,5]);
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