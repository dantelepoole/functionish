/**
 * @module lib/will
 * @ignore
 */

'use strict';

const expect = require('chai').expect;

const isvoid = value => (value === null) || (value === undefined);

const should_return = (comparator, message) => (func, ...args) => expect(func(...args), message).equals(comparator);
const should_return_a = (type, message) => (func, ...args) => expect( typeorclassname(func(...args), message) ).equals(type);
const should_return_empty = message => (func, ...args) => expect( (func(...args).length ?? func(...args).size), message ).equals(0);
const should_return_false = message => (func, ...args) => expect(func(...args), message).is.false;
const should_return_falsy = message => (func, ...args) => expect( !!func(...args), message ).is.false;
const should_return_like = (comparator, message) => (func, ...args) => expect(func(...args), message).deep.equals(comparator);
const should_return_nan = message => (func, ...args) => expect(func(...args), message).is.NaN;
const should_return_null = message => (func, ...args) => expect(func(...args), message).is.null;
const should_return_one = message => (func, ...args) => expect(func(...args), message).equals(1);
const should_return_true = message => (func, ...args) => expect(func(...args), message).is.true;
const should_return_truthy = message => (func, ...args) => expect( !!func(...args), message ).is.true;
const should_return_type = (type, message) => (func, ...args) => expect(func(...args), message).to.be.a(type);
const should_return_undefined = message => (func, ...args) => expect(func(...args), message).to.be.undefined;
const should_return_void = message => (func, ...args) => expect( isvoid(func(...args)), message).to.be.true;
const should_return_zero = message => (func, ...args) => expect(func(...args), message).equals(0);
const should_not_return = (comparator, message) => (func, ...args) => expect(func(...args), message).not.equal(comparator);
const should_not_return_a = (type, message) => (func, ...args) => expect(func(...args), message).is.not.a(type);
const should_not_return_empty = message => (func, ...args) => expect( (func(...args).length ?? func(...args).size), message ).not.equals(0);
const should_not_return_false = message => (func, ...args) => expect(func(...args), message).is.not.false;
const should_not_return_falsy = message => (func, ...args) => expect( !!func(...args), message ).is.not.false;
const should_not_return_like = (comparator, message) => (func, ...args) => expect(func(...args), message).not.deep.equals(comparator);
const should_not_return_nan = message => (func, ...args) => expect(func(...args), message).not.is.NaN;
const should_not_return_null = message => (func, ...args) => expect(func(...args), message).is.not.null;
const should_not_return_one = message => (func, ...args) => expect(func(...args), message).not.equals(1);
const should_not_return_true = message => (func, ...args) => expect(func(...args), message).is.not.true;
const should_not_return_truthy = message => (func, ...args) => expect( !!func(...args), message ).is.not.true;
const should_not_return_type = (type, message) => (func, ...args) => expect(func(...args), message).is.not.a(type);
const should_not_return_undefined = message => (func, ...args) => expect(func(...args), message).is.not.undefined;
const should_not_return_void = message => (func, ...args) => expect( isvoid(func(...args)), message).to.be.false;
const should_not_return_zero = message => (func, ...args) => expect(func(...args), message).not.equals(0);
const should_not_throw = (expected, message) => (func, ...args) =>  expect( ()=>func(...args) ).to.not.throw(expected, message);
const should_throw = (expected, message) => (func, ...args) =>  expect( () => func(...args) ).to.throw(expected, message);

module.exports.return = should_return;
module.exports.return.a = should_return_a;
module.exports.return.a.bigint = should_return_a('bigint');
module.exports.return.a.boolean = should_return_a('boolean');
module.exports.return.a.function = should_return_a('function');
module.exports.return.a.number = should_return_a('number');
module.exports.return.a.object = should_return_a('object');
module.exports.return.a.string = should_return_a('string');
module.exports.return.a.symbol = should_return_a('symbol');
module.exports.return.an = { object:should_return_a('object') };
module.exports.return.empty = should_return_empty;
module.exports.return.false = should_return_false;
module.exports.return.falsy = should_return_falsy;
module.exports.return.like = should_return_like;
module.exports.return.NaN = should_return_nan;
module.exports.return.null = should_return_null;
module.exports.return.one = should_return_one;
module.exports.return.true = should_return_true;
module.exports.return.truthy = should_return_truthy;
module.exports.return.type = should_return_type;
module.exports.return.type.function = should_return_type('function');
module.exports.return.type.string = should_return_type('string');
module.exports.return.type.number = should_return_type('number');
module.exports.return.type.symbol = should_return_type('symbol');
module.exports.return.type.bigint = should_return_type('bigint');
module.exports.return.type.boolean = should_return_type('boolean');
module.exports.return.type.object = should_return_type('object');
module.exports.return.type.undefined = should_return_type('undefined');
module.exports.return.undefined = should_return_undefined;
module.exports.return.void = should_return_void;
module.exports.return.zero = should_return_zero;
module.exports.not = {};
module.exports.not.return = should_not_return;
module.exports.not.return.a = should_not_return_a;
module.exports.not.return.a.bigint = should_not_return_a('bigint');
module.exports.not.return.a.boolean = should_not_return_a('boolean');
module.exports.not.return.a.function = should_not_return_a('function');
module.exports.not.return.a.object = should_not_return_a('object');
module.exports.not.return.a.number = should_not_return_a('number');
module.exports.not.return.a.string = should_not_return_a('string');
module.exports.not.return.a.symbol = should_not_return_a('symbol');
module.exports.not.return.an = { object:should_not_return_a('object') };
module.exports.not.return.empty = should_not_return_empty;
module.exports.not.return.false = should_not_return_false;
module.exports.not.return.falsy = should_not_return_falsy;
module.exports.not.return.like = should_not_return_like;
module.exports.not.return.NaN = should_not_return_nan;
module.exports.not.return.null = should_not_return_null;
module.exports.not.return.one = should_not_return_one;
module.exports.not.return.true = should_not_return_true;
module.exports.not.return.truthy = should_not_return_truthy;
module.exports.not.return.type = should_not_return_type;
module.exports.not.return.type.function = should_not_return_type('function');
module.exports.not.return.type.string = should_not_return_type('string');
module.exports.not.return.type.number = should_not_return_type('number');
module.exports.not.return.type.symbol = should_not_return_type('symbol');
module.exports.not.return.type.bigint = should_not_return_type('bigint');
module.exports.not.return.type.boolean = should_not_return_type('boolean');
module.exports.not.return.type.object = should_not_return_type('object');
module.exports.not.return.type.undefined = should_not_return_type('undefined');
module.exports.not.return.undefined = should_not_return_undefined
module.exports.not.return.void = should_not_return_void;
module.exports.not.return.zero = should_not_return_zero;
module.exports.not.throw = should_not_throw;
module.exports.throw = should_throw;

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