const expect = require('chai').expect;
const iterate = require('../iterate');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];

let total = 0;
let addtototalcallcount = 0;

function addtototal(x) {
    addtototalcallcount += 1;
    total += x;
}

describe(`iterate()`, function() {

    beforeEach(
        function() {
            total = 0;
            addtototalcallcount = 0;
        }
    )

    it(`should be curried`,
        function () {
            const curried = iterate(addtototal);
            expectfunction(curried);

            curried(numbers1to10);
            expectequal(total, 55);
        }
    )

    it(`should throw if its second argument is not iterable`,
        function () {
            expecttothrow(iterate, addtototal, markerobject);
        }
    )

    it(`should throw if its first argument is not a function`,
        function () {
            expecttothrow(iterate, markerobject, numbers1to10);
        }
    )

    it(`should return undefined`,
        function () {
            const result = iterate(addtototal, numbers1to10);
            expectundefined(result);
        }
    )

    it(`should pass its first argument to the forEach() method of its second argument if it has one`,
        function () {
            let wasinvoked = 0;
            const obj = {
                forEach(func) {
                    wasinvoked += 1;
                    expectfunction(func);
                }
            }
            iterate(addtototal, obj);
            expectequal(wasinvoked, 1);
        }
    )

    it(`should invoke its first argument for each item produced by its second argument if it has no forEach() method`,
        function () {
            let wasinvoked = 0;
            const obj = {
                [Symbol.iterator]: function* () {
                    for(const num of numbers1to10) {
                        wasinvoked += 1;
                        yield num;
                    }
                }
            }
            iterate(addtototal, obj);
            expectequal(wasinvoked, numbers1to10.length);
            expectequal(total, 55);
        }
    )

    it(`should pass invoke its first argument with a single argument each time`,
        function () {
            function func(...args) {
                expectequal( args.length, 1 );
            }
            iterate(func, numbers1to10);
        }
    )

    it(`should pass invoke its first argument once for each item in its second argument`,
        function () {
            function func(x) {
                addtototal(x);
                expectequal(addtototalcallcount, x);
            }
            iterate(func, numbers1to10);
            expectequal(addtototalcallcount, 10);
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