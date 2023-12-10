/**
 * @module lib/should
 * @ignore
 */

'use strict';

const curry1 = require('../../src/curry1');
const expect = require('chai').expect;
const evaluate = require('./evaluate');

const nodetypes = require('util').types;

const isvoid = value => (value === null) || (value === undefined);

/**
 * SHOULD BE FUNCTIONS
 */

const should_be = curry1( (comparator, x) => expect( evaluate(x) ).equals(comparator) );
const should_be_a = curry1( (type, x) => expect( typeorclassname( evaluate(x) ) ).equals(type) );
const should_be_a_Promise = x => expect( nodetypes.isPromise(x) ).to.be.true;
const should_be_an_Array = x => expect( Array.isArray(x) ).to.be.true;
const should_be_an_Error = x => expect( nodetypes.isNativeError(x) ).to.be.true;
const should_be_called = func => expect( func.callCount ).to.be.greaterThan(0);
const should_be_called_once = func => expect( func.callCount ).to.equal(1);
const should_be_called_twice = func => expect( func.callCount ).to.equal(2);
const should_be_called_thrice = func => expect( func.callCount ).to.equal(3);
const should_be_called_with = curry1( (expectedargs, func) => expect( func.args[ func.args.length-1 ] ).to.deep.equal(expectedargs) );
const should_be_empty = x => expect( evaluate(x).length ?? evaluate(x).size ).equals(0);
const should_be_false = x => expect( evaluate(x) ).is.false;
const should_be_falsy = x => expect( !!evaluate(x) ).is.false;
const should_be_instance_of = curry1( (classofx, x) => expect( evaluate(x) ).is.instanceof(classofx) );
const should_be_like = curry1( (comparator, x) => expect( evaluate(x) ).deep.equals(comparator) );
const should_be_nan = x => expect( evaluate(x) ).is.NaN;
const should_be_null = x => expect( evaluate(x) ).is.null;
const should_be_one = x => expect( evaluate(x) ).equals(1);
const should_be_true = x => expect( evaluate(x) ).is.true;
const should_be_truthy = x => expect( !!evaluate(x) ).is.true;
const should_be_type = curry1( (type, x) => expect( evaluate(x) ).to.be.a(type) );
const should_be_undefined = x => expect( evaluate(x) ).to.be.undefined;
const should_be_void = x => expect( isvoid( evaluate(x) )).to.be.true;
const should_be_zero = x => expect( evaluate(x) ).equals(0);
const should_not_be = curry1( (comparator, x) => expect( evaluate(x) ).not.equal(comparator) );
const should_not_be_a = (type, x) => expect( evaluate(x) ).is.not.a(type);
const should_not_be_a_Promise = x => expect( nodetypes.isPromise(x) ).to.be.false;
const should_not_be_an_Array = x => expect( Array.isArray(x) ).to.be.false;
const should_not_be_an_Error = x => expect( nodetypes.isNativeError(x) ).to.be.false;
const should_not_be_called = func => expect( func.callCount ).to.equal(0);
const should_not_be_called_once = func => expect( func.callCount ).not.to.equal(1);
const should_not_be_called_twice = func => expect( func.callCount ).not.to.equal(2);
const should_not_be_called_thrice = func => expect( func.callCount ).not.to.equal(3);
const should_not_be_empty = x => expect( evaluate(x).length ?? evaluate(x).size ).not.equals(0);
const should_not_be_false = x => expect( evaluate(x) ).is.not.false;
const should_not_be_falsy = x => expect( !!evaluate(x) ).is.not.false;
const should_not_be_instance_of = curry1( (classofx, x) => expect( evaluate(x) ).is.not.instanceof(classofx) );
const should_not_be_like = curry1( (comparator, x) => expect( evaluate(x) ).not.deep.equals(comparator) );
const should_not_be_nan = x => expect( evaluate(x) ).not.is.NaN;
const should_not_be_null = x => expect( evaluate(x) ).is.not.null;
const should_not_be_one = x => expect( evaluate(x) ).not.equals(1);
const should_not_be_true = x => expect( evaluate(x) ).is.not.true;
const should_not_be_truthy = x => expect( !!evaluate(x) ).is.not.true;
const should_not_be_type = curry1( (type, x) => expect( evaluate(x) ).is.not.a(type) );
const should_not_be_undefined = x => expect( evaluate(x) ).is.not.undefined;
const should_not_be_void = x => expect( isvoid( evaluate(x) )).to.be.false;
const should_not_be_zero = x => expect( evaluate(x) ).not.equals(0);

module.exports.be = should_be;
module.exports.be.a = should_be_a;
module.exports.be.a.Array = should_be_an_Array;
module.exports.be.a.Error = should_be_an_Error;
module.exports.be.a.Promise = should_be_a_Promise;
module.exports.be.a.bigint = should_be_a('bigint');
module.exports.be.a.boolean = should_be_a('boolean');
module.exports.be.a.function = should_be_a('function');
module.exports.be.a.number = should_be_a('number');
module.exports.be.a.object = should_be_a('object');
module.exports.be.a.string = should_be_a('string');
module.exports.be.a.symbol = should_be_a('symbol');
module.exports.be.an = { object:should_be_a('object'), Error:should_be_an_Error, Array:should_be_an_Array };
module.exports.be.called = should_be_called;
module.exports.be.called.once = should_be_called_once;
module.exports.be.called.twice = should_be_called_twice;
module.exports.be.called.thrice = should_be_called_thrice;
module.exports.be.called.with = should_be_called_with;
module.exports.be.empty = should_be_empty;
module.exports.be.false = should_be_false;
module.exports.be.falsy = should_be_falsy;
module.exports.be.instanceof = should_be_instance_of;
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
module.exports.not.be.a.Array = should_not_be_an_Array;
module.exports.not.be.a.Error = should_not_be_an_Error;
module.exports.not.be.a.Promise = should_not_be_a_Promise;
module.exports.not.be.a.bigint = should_not_be_a('bigint');
module.exports.not.be.a.boolean = should_not_be_a('boolean');
module.exports.not.be.a.function = should_not_be_a('function');
module.exports.not.be.a.number = should_not_be_a('number');
module.exports.not.be.a.object = should_not_be_a('object');
module.exports.not.be.a.string = should_not_be_a('string');
module.exports.not.be.a.symbol = should_not_be_a('symbol');
module.exports.not.be.an = { object:should_not_be_a('object'), Error:should_not_be_an_Error, Array:should_not_be_an_Array };
module.exports.not.be.called = should_not_be_called;
module.exports.not.be.called.once = should_not_be_called_once;
module.exports.not.be.called.twice = should_not_be_called_twice;
module.exports.not.be.called.thrice = should_not_be_called_thrice;
module.exports.not.be.empty = should_not_be_empty;
module.exports.not.be.false = should_not_be_false;
module.exports.not.be.falsy = should_not_be_falsy;
module.exports.not.be.instanceof = should_not_be_instance_of;
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
 * SHOULD THROW FUNCTIONS
 */
const should_not_throw = (func, ...args) =>  expect( ()=>func(...args) ).to.not.throw();
const should_not_throw_a = curry1( (expected, func, ...args) =>  expect( ()=>func(...args) ).to.not.throw(expected) );
const should_throw = (func, ...args) =>  expect( () => func(...args) ).to.throw();
const should_throw_a = curry1( (expected, func, ...args) =>  expect( () => func(...args) ).to.throw(expected) );

module.exports.not.throw = should_not_throw;
module.exports.not.throw.a = should_not_throw_a;
module.exports.throw = should_throw;
module.exports.throw.a = should_throw_a;

/**
 * SHOULD RETURN FUNCTIONS
 */

const should_return = curry1( (comparator, func, ...args) => expect( func(...args) ).equals(comparator) );
const should_return_a = curry1( (type, func, ...args) => expect( typeorclassname(func(...args)) ).equals(type) );
const should_return_a_Promise = (func, ...args) => expect( nodetypes.isPromise( func(...args) ) ).to.be.true;
const should_return_an_Array = (func, ...args) => expect( Array.isArray( func(...args) ) ).to.be.true;
const should_return_an_Error = (func, ...args) => expect( nodetypes.isNativeError( func(...args) ) ).to.be.true;
const should_return_empty = (func, ...args) => expect( (func(...args).length ?? func(...args).size) ).equals(0);
const should_return_false = (func, ...args) => expect( func(...args) ).is.false;
const should_return_falsy = (func, ...args) => expect( !!func(...args) ).is.false;
const should_return_like = curry1( (comparator, func, ...args) => expect( func(...args) ).deep.equals(comparator) );
const should_return_nan = (func, ...args) => expect( func(...args) ).is.NaN;
const should_return_null = (func, ...args) => expect( func(...args) ).is.null;
const should_return_one = (func, ...args) => expect( func(...args) ).equals(1);
const should_return_true = (func, ...args) => expect( func(...args) ).is.true;
const should_return_truthy = (func, ...args) => expect( !!func(...args) ).is.true;
const should_return_type = curry1( (type, func, ...args) => expect( func(...args) ).to.be.a(type) );
const should_return_undefined = (func, ...args) => expect( func(...args) ).to.be.undefined;
const should_return_void = (func, ...args) => expect( isvoid(func(...args)) ).to.be.true;
const should_return_zero = (func, ...args) => expect( func(...args) ).equals(0);
const should_not_return = curry1( (comparator, func, ...args) => expect( func(...args) ).not.equal(comparator) );
const should_not_return_a = curry1( (type, func, ...args) => expect( func(...args) ).is.not.a(type) );
const should_not_return_a_Promise = (func, ...args) => expect( !nodetypes.isPromise( func(...args) ) ).to.be.true;
const should_not_return_an_Array = (func, ...args) => expect( !Array.isArray( func(...args) ) ).to.be.true;
const should_not_return_an_Error = (func, ...args) => expect( !nodetypes.isNativeError( func(...args) ) ).to.be.true;
const should_not_return_empty = (func, ...args) => expect( (func(...args).length ?? func(...args).size) ).not.equals(0);
const should_not_return_false = (func, ...args) => expect( func(...args) ).is.not.false;
const should_not_return_falsy = (func, ...args) => expect( !!func(...args) ).is.not.false;
const should_not_return_like = curry1( (comparator, func, ...args) => expect( func(...args) ).not.deep.equals(comparator) );
const should_not_return_nan = (func, ...args) => expect( func(...args) ).not.is.NaN;
const should_not_return_null = (func, ...args) => expect( func(...args) ).is.not.null;
const should_not_return_one = (func, ...args) => expect( func(...args) ).not.equals(1);
const should_not_return_true = (func, ...args) => expect( func(...args) ).is.not.true;
const should_not_return_truthy = (func, ...args) => expect( !!func(...args) ).is.not.true;
const should_not_return_type = type => (func, ...args) => expect( func(...args) ).is.not.a(type);
const should_not_return_undefined = (func, ...args) => expect( func(...args) ).is.not.undefined;
const should_not_return_void = (func, ...args) => expect( isvoid(func(...args)) ).to.be.false;
const should_not_return_zero = (func, ...args) => expect( func(...args) ).not.equals(0);

module.exports.return = should_return;
module.exports.return.a = should_return_a;
module.exports.return.a.Array = should_return_an_Array;
module.exports.return.a.Error = should_return_an_Error;
module.exports.return.a.Promise = should_return_a_Promise;
module.exports.return.a.bigint = should_return_a('bigint');
module.exports.return.a.boolean = should_return_a('boolean');
module.exports.return.a.function = should_return_a('function');
module.exports.return.a.number = should_return_a('number');
module.exports.return.a.object = should_return_a('object');
module.exports.return.a.string = should_return_a('string');
module.exports.return.a.symbol = should_return_a('symbol');
module.exports.return.an = { object:should_return_a('object'), Array:should_return_an_Array, Error:should_return_an_Error };
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
module.exports.not.return = should_not_return;
module.exports.not.return.a = should_not_return_a;
module.exports.not.return.a.Array = should_not_return_an_Array;
module.exports.not.return.a.Error = should_not_return_an_Error;
module.exports.not.return.a.Promise = should_not_return_a_Promise;
module.exports.not.return.a.bigint = should_not_return_a('bigint');
module.exports.not.return.a.boolean = should_not_return_a('boolean');
module.exports.not.return.a.function = should_not_return_a('function');
module.exports.not.return.a.object = should_not_return_a('object');
module.exports.not.return.a.number = should_not_return_a('number');
module.exports.not.return.a.string = should_not_return_a('string');
module.exports.not.return.a.symbol = should_not_return_a('symbol');
module.exports.not.return.an = { object:should_not_return_a('object'), Array:should_not_return_an_Array, Error:should_not_return_an_Error };
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