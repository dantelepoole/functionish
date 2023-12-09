/**
 * @module lib/should
 * @ignore
 */

'use strict';

const curry1 = require('../../src/curry1');
const expect = require('chai').expect;

const isvoid = value => (value === null) || (value === undefined);

const should_be = curry1( (comparator, x, message) => expect(x, message).equals(comparator) );
const should_be_a = curry1( (type, x, message) => expect( typeorclassname(x), message ).equals(type) );
const should_be_empty = (x, message) => expect( (x.length ?? x.size), message ).equals(0);
const should_be_false = (x, message) => expect(x, message).is.false;
const should_be_falsy = (x, message) => expect( !!x, message ).is.false;
const should_be_like = curry1( (comparator, x, message) => expect(x, message).deep.equals(comparator) );
const should_be_nan = (x, message) => expect(x, message).is.NaN;
const should_be_null = (x, message) => expect(x, message).is.null;
const should_be_one = (x, message) => expect(x, message).equals(1);
const should_be_true = (x, message) => expect(x, message).is.true;
const should_be_truthy = (x, message) => expect( !!x, message ).is.true;
const should_be_type = curry1( (type, x, message) => expect(x, message).to.be.a(type) );
const should_be_undefined = (x, message) => expect(x, message).to.be.undefined;
const should_be_void = (x, message) => expect( isvoid(x), message).to.be.true;
const should_be_zero = (x, message) => expect(x, message).equals(0);
const should_not_be = curry1( (comparator, x, message) => expect(x, message).not.equal(cpmparator) );
const should_not_be_a = curry1( (type, x, message) => expect(x, message).is.not.a(type) );
const should_not_be_empty = (x, message) => expect( (x.length ?? x.size), message ).not.equals(0);
const should_not_be_false = (x, message) => expect(x, message).is.not.false;
const should_not_be_falsy = (x, message) => expect( !!x, message ).is.not.false;
const should_not_be_like = curry1( (comparator, x, message) => expect(x, message).not.deep.equals(comparator) );
const should_not_be_nan = (x, message) => expect(x, message).not.is.NaN;
const should_not_be_null = (x, message) => expect(x, message).is.not.null;
const should_not_be_one = (x, message) => expect(x, message).not.equals(1);
const should_not_be_true = (x, message) => expect(x, message).is.not.true;
const should_not_be_truthy = (x, message) => expect( !!x, message ).is.not.true;
const should_not_be_type = curry1( (type,x, message) => expect(x, message).is.not.a(type) );
const should_not_be_undefined = (x, message) => expect(x, message).is.not.undefined;
const should_not_be_void = (x, message) => expect( isvoid(x), message).to.be.false;
const should_not_be_zero = (x, message) => expect(x, message).not.equals(0);

module.exports.be = should_be;
module.exports.be.a = should_be_a;
module.exports.be.a.bigint = should_be_a('bigint');
module.exports.be.a.boolean = should_be_a('boolean');
module.exports.be.a.function = should_be_a('function');
module.exports.be.a.number = should_be_a('number');
module.exports.be.a.object = should_be_a('object');
module.exports.be.a.string = should_be_a('string');
module.exports.be.a.symbol = should_be_a('symbol');
module.exports.be.an = { object:should_be_a('object') };
module.exports.be.empty = should_be_empty;
module.exports.be.false = should_be_false;
module.exports.be.falsy = should_be_falsy;
module.exports.be.like = should_be_like;
module.exports.be.NaN = should_be_nan;
module.exports.be.null = should_be_null;
module.exports.be.one = should_be_one;
module.exports.be.true = should_be_true;
module.exports.be.truthy = should_be_truthy;
module.exports.be.type = should_be_type;
module.exports.be.type.function = should_be_type('function');
module.exports.be.type.string = should_be_type('string');
module.exports.be.type.number = should_be_type('number');
module.exports.be.type.symbol = should_be_type('symbol');
module.exports.be.type.bigint = should_be_type('bigint');
module.exports.be.type.boolean = should_be_type('boolean');
module.exports.be.type.object = should_be_type('object');
module.exports.be.type.undefined = should_be_type('undefined');
module.exports.be.undefined = should_be_undefined;
module.exports.be.void = should_be_void;
module.exports.be.zero = should_be_zero;
module.exports.not = {};
module.exports.not.be = should_not_be;
module.exports.not.be.a = should_not_be_a;
module.exports.not.be.a.bigint = should_not_be_a('bigint');
module.exports.not.be.a.boolean = should_not_be_a('boolean');
module.exports.not.be.a.function = should_not_be_a('function');
module.exports.not.be.a.number = should_not_be_a('number');
module.exports.not.be.a.object = should_not_be_a('object');
module.exports.not.be.a.string = should_not_be_a('string');
module.exports.not.be.a.symbol = should_not_be_a('symbol');
module.exports.not.be.an = { object:should_not_be_a('object') };
module.exports.not.be.empty = should_not_be_empty;
module.exports.not.be.false = should_not_be_false;
module.exports.not.be.falsy = should_not_be_falsy;
module.exports.not.be.like = should_not_be_like;
module.exports.not.be.NaN = should_not_be_nan;
module.exports.not.be.null = should_not_be_null;
module.exports.not.be.one = should_not_be_one;
module.exports.not.be.true = should_not_be_true;
module.exports.not.be.truthy = should_not_be_truthy;
module.exports.not.be.type = should_not_be_type;
module.exports.not.be.type.bigint = should_not_be_type('bigint');
module.exports.not.be.type.boolean = should_not_be_type('boolean');
module.exports.not.be.type.function = should_not_be_type('function');
module.exports.not.be.type.number = should_not_be_type('number');
module.exports.not.be.type.object = should_not_be_type('object');
module.exports.not.be.type.string = should_not_be_type('string');
module.exports.not.be.type.symbol = should_not_be_type('symbol');
module.exports.not.be.type.undefined = should_not_be_type('undefined');
module.exports.not.be.undefined = should_not_be_undefined
module.exports.not.be.void = should_not_be_void;
module.exports.not.be.zero = should_not_be_zero;

/**
 * TYPE SUPPORT FUNCTIONS
 */
const CLASS_NAN = 'NaN';
const CLASS_NUMBER = 'Number';
const CLASS_OBJECT = 'Object';
const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';
const TYPE_OBJECT = 'object';

const objectstring = Object.prototype.toString.call.bind(Object.prototype.toString);
const getclassname = obj => objectstring(obj).slice(8,-1);
const getprototype = Object.getPrototypeOf;
const constructorname = obj => getprototype(obj)?.constructor?.name;

function classname(value) {

    const classname = getclassname(value);

    return (classname === CLASS_OBJECT) ? (constructorname(value) || classname)
         : (classname !== CLASS_NUMBER) ? classname
         : (value === value) ? CLASS_NUMBER
         : CLASS_NAN;
}

function type(value) {
    
    return (value === null) ? TYPE_NULL
         : (value === value) ? typeof value
         : TYPE_NAN;
}

function typeorclassname(value) {

    const valuetype = type(value);

    return (valuetype === TYPE_OBJECT)
         ? classname(value)
         : valuetype;
}