const expect = require('chai').expect;
const isfunction = require('../isfunction');

const markerobject = Object.freeze({});
const markerarray = Object.freeze([]);
const markersymbol = Symbol();

class MyClass {
    constructor(x) {
        this.x = x;
    }
}

class MySubClass extends MyClass {
    constructor(x) {
        super(x);
    }
}

describe(`isfunction()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return true if its argument has type 'function'`,
        function () {
            expecttrue( isfunction(expect) );
            expecttrue( isfunction( ()=>{} ) );
            expecttrue( isfunction(isfunction) );
            expecttrue( isfunction(function(){}) );
            expecttrue( isfunction(function func() {}) );

            function returnfunction() { return ()=>{} }
            expecttrue( isfunction(returnfunction()) );
        }
    )

    it(`should return true if its argument is a class`,
        function () {
            expecttrue( isfunction(MyClass) );
            expecttrue( isfunction(MySubClass) );
            expecttrue( isfunction(Error) );
            expecttrue( isfunction(Date) );
        }
    )

    it(`should return true if its argument has a type other than 'function'`,
        function () {

            expectfalse( isfunction(true) );
            expectfalse( isfunction(0) );
            expectfalse( isfunction(1) );
            expectfalse( isfunction(-0) );
            expectfalse( isfunction(42n) );
            expectfalse( isfunction('function') );
            expectfalse( isfunction('') );
            expectfalse( isfunction(markerobject) );
            expectfalse( isfunction(markerarray) );
            expectfalse( isfunction(markersymbol) );
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