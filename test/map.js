const expect = require('chai').expect;
const map = require('../map');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

function double(x) {
    return x*2;
}

describe(`map()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should pass its first argument to the map() method of its second argument`,
        function () {

            let invoked;
            function setinvoked(x) {
                invoked = x;
            }
            const obj = {
                map(func) {
                    func(markerobject);
                }
            }

            map(setinvoked, obj);
            expectequal(invoked, markerobject);
        }
    )
    
    it(`should throw if its second argument has no map() method`,
        function () {
            const obj = {}
            expecttothrow(map, double, obj);
        }
    )

    it(`should ensure its first argument is only ever passed a single argument on each invocation`,
        function () {
            let invocationcount = 0;
            function expectsingleargument(...args) {
                invocationcount += 1;
                expectequal( args.length, 1 );
            }
            const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
            map(expectsingleargument, numbers1to10);
            expectequal(invocationcount, 10);
        }
    )

    it(`should invoke its first argument once for every item in its second argument`,
        function () {
            let invocationcount = 0;
            function countinvocation() {
                invocationcount += 1;
            }
            const numbers1to10 = [1,2,3,4,5,6,7,8,9,10];
            map(countinvocation, numbers1to10);
            expectequal(invocationcount, 10);
        }
    )

    it(`should be curried`,
        function () {
            const curried = map(double);
            expectfunction(curried);

            expectdeepequal(curried([42]), [84]);
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