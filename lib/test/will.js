/**
 * @module lib/will
 * @ignore
 */

'use strict';

const curry1 = require('../../src/curry1');
const expect = require('chai').expect;

const isvoid = value => (value === null) || (value === undefined);

const a = curry1( (type, func, args=[], message) => expect( typeorclassname(func(...args), message) ).equals(type) );
const not_a = curry1( (type, func, args=[], message) => expect(func(...args), message).is.not.a(type) );

const will_be = curry1( (comparator, func, args=[], message) => expect(func(...args), message).equals(comparator) );
const will_be_empty = (func, args=[], message) => expect( (func(...args).length ?? func(...args).size), message ).equals(0);
const will_be_false = (func, args=[], message) => expect(func(...args), message).is.false;
const will_be_falsy = (func, args=[], message) => expect( !!func(...args), message ).is.false;
const will_be_like = curry1( (comparator, func, args=[], message) => expect(func(...args), message).deep.equals(comparator) );
const will_be_nan = (func, args=[], message) => expect(func(...args), message).is.NaN;
const will_be_null = (func, args=[], message) => expect(func(...args), message).is.null;
const will_be_one = (func, args=[], message) => expect(func(...args), message).equals(1);
const will_be_true = (func, args=[], message) => expect(func(...args), message).is.true;
const will_be_truthy = (func, args=[], message) => expect( !!func(...args), message ).is.true;
const will_be_type = curry1( (type, func, args=[], message) => expect(func(...args), message).to.be.a(type) );
const will_be_undefined = (func, args=[], message) => expect(func(...args), message).to.be.undefined;
const will_be_void = (func, args=[], message) => expect( isvoid(func(...args)), message).to.be.true;
const will_be_zero = (func, args=[], message) => expect(func(...args), message).equals(0);
const will_not_be = curry1( (comparator, func, args=[], message) => expect(func(...args), message).not.equal(comparator) );
const will_not_be_empty = (func, args=[], message) => expect( (func(...args).length ?? func(...args).size), message ).not.equals(0);
const will_not_be_false = (func, args=[], message) => expect(func(...args), message).is.not.false;
const will_not_be_falsy = (func, args=[], message) => expect( !!func(...args), message ).is.not.false;
const will_not_be_like = curry1( (comparator, func, args=[], message) => expect(func(...args), message).not.deep.equals(comparator) );
const will_not_be_nan = (func, args=[], message) => expect(func(...args), message).not.is.NaN;
const will_not_be_null = (func, args=[], message) => expect(func(...args), message).is.not.null;
const will_not_be_one = (func, args=[], message) => expect(func(...args), message).not.equals(1);
const will_not_be_true = (func, args=[], message) => expect(func(...args), message).is.not.true;
const will_not_be_truthy = (func, args=[], message) => expect( !!func(...args), message ).is.not.true;
const will_not_be_type = curry1( (type, func, args=[], message) => expect(func(...args), message).is.not.a(type) );
const will_not_be_undefined = (func, args=[], message) => expect(func(...args), message).is.not.undefined;
const will_not_be_void = (func, args=[], message) => expect( isvoid(func(...args)), message).to.be.false;
const will_not_be_zero = (func, args=[], message) => expect(func(...args), message).not.equals(0);
const will_not_throw = (func, args=[], expected, message) => expect( ()=>func(...args) ).to.not.throw(expected, message);
const will_throw = (func, args=[], expected, message) => expect( () => func(...args) ).to.throw(expected, message);

module.exports.throw = will_throw;

module.exports.be = will_be;
module.exports.be.empty = will_be_empty;
module.exports.be.false = will_be_false;
module.exports.be.falsy = will_be_falsy;
module.exports.be.like = will_be_like;
module.exports.be.NaN = will_be_nan;
module.exports.be.null = will_be_null;
module.exports.be.one = will_be_one;
module.exports.be.true = will_be_true;
module.exports.be.truthy = will_be_truthy;
module.exports.be.undefined = will_be_undefined;
module.exports.be.void = will_be_void;
module.exports.be.zero = will_be_zero;

module.exports.be.type = will_be_type;
module.exports.be.type.function = will_be_type('function');
module.exports.be.type.string = will_be_type('string');
module.exports.be.type.number = will_be_type('number');
module.exports.be.type.symbol = will_be_type('symbol');
module.exports.be.type.bigint = will_be_type('bigint');
module.exports.be.type.boolean = will_be_type('boolean');
module.exports.be.type.object = will_be_type('object');
module.exports.be.type.undefined = will_be_type('undefined');

module.exports.be.a = a;
module.exports.be.a.function = a('function');
module.exports.be.a.string = a('string');
module.exports.be.a.number = a('number');
module.exports.be.a.symbol = a('symbol');
module.exports.be.a.bigint = a('bigint');
module.exports.be.a.boolean = a('boolean');
module.exports.be.a.object = a('object');
module.exports.be.an = { object:a('object') };

module.exports.not = {};
module.exports.not.throw = will_not_throw;

module.exports.not.be = will_not_be;
module.exports.not.be.empty = will_not_be_empty;
module.exports.not.be.false = will_not_be_false;
module.exports.not.be.falsy = will_not_be_falsy;
module.exports.not.be.like = will_not_be_like;
module.exports.not.be.NaN = will_not_be_nan;
module.exports.not.be.null = will_not_be_null;
module.exports.not.be.one = will_not_be_one;
module.exports.not.be.true = will_not_be_true;
module.exports.not.be.truthy = will_not_be_truthy;
module.exports.not.be.undefined = will_not_be_undefined
module.exports.not.be.void = will_not_be_void;
module.exports.not.be.zero = will_not_be_zero;

module.exports.not.be.type = will_not_be_type;
module.exports.not.be.type.function = will_not_be_type('function');
module.exports.not.be.type.string = will_not_be_type('string');
module.exports.not.be.type.number = will_not_be_type('number');
module.exports.not.be.type.symbol = will_not_be_type('symbol');
module.exports.not.be.type.bigint = will_not_be_type('bigint');
module.exports.not.be.type.boolean = will_not_be_type('boolean');
module.exports.not.be.type.object = will_not_be_type('object');
module.exports.not.be.type.undefined = will_not_be_type('undefined');

module.exports.not.be.a = not_a;
module.exports.not.be.a.function = not_a('function');
module.exports.not.be.a.string = not_a('string');
module.exports.not.be.a.number = not_a('number');
module.exports.not.be.a.symbol = not_a('symbol');
module.exports.not.be.a.bigint = not_a('bigint');
module.exports.not.be.a.boolean = not_a('boolean');
module.exports.not.be.a.object = not_a('object');
module.exports.not.be.an = { object:not_a('object') };

/**
 * TYPE SUPPORT FUNCTIONS
 */
const CLASS_NAN = 'NaN';
const CLASS_NUMBER = 'Number';
const CLASS_OBJECT = 'Object';
const TYPE_NAN = 'NaN';
const TYPE_NULL = 'null';

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