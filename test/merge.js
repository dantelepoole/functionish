const expect = require('chai').expect;
const merge = require('../merge');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

describe(`merge()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a new object that contains copies of all own, enumerable properties of each argument`,
        function () {
            const obj1 = { a:'a', b:'b' };
            const obj2 = { c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expectdeepequal( ['a','b','c','d'], Object.keys(merged) )
            expectequal( 'a', merged.a );
            expectequal( 'b', merged.b );
            expectequal( 'c', merged.c );
            expectequal( 'd', merged.d );

            expectnotequal(merged, obj1);
            expectnotequal(merged, obj2);
        }
    )

    it(`if multiple argument have a property with the same key, it should copy the property from the last argument`,
        function () {
            const obj1 = { a:'a', b:'b' };
            const obj2 = { a: 'aa', c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expectdeepequal( ['a','b','c','d'], Object.keys(merged) )
            expectequal( 'aa', merged.a );
            expectequal( 'b', merged.b );
            expectequal( 'c', merged.c );
            expectequal( 'd', merged.d );

        }
    )

    it(`should make a shallow copy of the arguments' properties`,
        function () {
            const obj1 = { a:'a', b:markerobject };
            const obj2 = { c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expectequal( obj1.b, merged.b );
            
        }
    )

    it(`if passed a single argument, it should return a shallow copy of it`,
        function () {
            const obj1 = { a:'a', b:markerobject };
            const merged = merge(obj1);

            expectdeepequal( obj1, merged );
            expectequal(obj1.a, merged.a);
            expectequal( obj1.b, merged.b );
            
        }
    )

    it(`should only copy own properties from the arguments`,
        function () {
            const proto = { a:'a'};
            const obj = Object.create(proto);
            obj.b = 'b';

            const merged = merge(obj);

            expectequal( 1, Object.keys(merged).length );
            expectundefined( merged.a );
            expectequal( 'b', merged.b );
        }
    )

    it(`should only copy enumerable properties from the arguments`,
        function () {
            obj = { a:'a' };
            Object.defineProperty(obj, 'b', {value:'b', enumerable:false});
            const merged = merge(obj);

            expectequal( 1, Object.keys(merged).length );
            expectundefined( merged.b );
            expectequal( 'a', merged.a );
            
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