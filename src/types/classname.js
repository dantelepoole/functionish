/**
 * @module types/classname
 */

'use strict'

const CLASS_NAN = 'NaN';
const CLASS_NUMBER = 'Number';
const CLASS_OBJECT = 'Object';

const objectstring = Object.prototype.toString.call.bind(Object.prototype.toString);
const getclassname = obj => objectstring(obj).slice(8,-1);
const getprototype = Object.getPrototypeOf;
const constructorname = obj => getprototype(obj).constructor.name;

/**
 * Return the name of the class (constructor) of *value*. If *value* is primitive, the name of its object constructor
 * is returned, i.e. the name of its type with a capital first letter.
 * 
 * This function works by passing *value* to the `Object.prototype.toString.call()` method. If *value* has a custom
 * class that does not implement a getter with the well-known symbol `Symbol.toStringTag` as key, a generic classname
 * of `Object` will be returned.
 * 
 * @example
 * 
 * const classname = require('functionish/types/classname');
 * 
 * classname(42); // returns 'Number'
 * classname(true); // returns 'Boolean'
 * classname({}); // returns 'Object'
 * classname(null); // returns 'Null'
 * classname( new Date() ); // returns 'Date'
 * 
 * class Foobar {}
 * class SubFoobar extends Foobar {}
 * 
 * classname(Foobar); // returns 'Function'
 * classname( new Foobar() ); // returns 'Foobar'
 * classname( new SubFoobar() ); // returns 'SubFoobar'
 * 
 * @function classname
 * @param {any} value 
 * @returns {string}
 */
module.exports = function classname(value) {

    const objectclassname = getclassname(value);

    return (objectclassname === CLASS_OBJECT) ? (constructorname(value) || objectclassname)
         : (objectclassname !== CLASS_NUMBER) ? objectclassname
         : (value === value) ? CLASS_NUMBER
         : CLASS_NAN;
}