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
const constructorname = obj => getprototype(obj)?.constructor?.name;

/**
 * Return the name of the class (constructor) of *value*. If *value* is primitive, the name of its object constructor
 * is returned, i.e. the name of its type with a capital first letter.
 * 
 * This function works by passing *value* to the `Object.prototype.toString.call()` method. If *value* has a custom
 * class that does not implement a getter with the well-known symbol `Symbol.toStringTag` as key, a generic classname
 * of `Object` will be returned.
 * 
 * If *value* is `null`, the classname will be `Null`. If *value* is `NaN`, the classname will be `NaN`.
 * 
 * @example <caption>Example usage of `classname()`</caption>
 * 
 * const { classname } = require('functionish/types');
 * 
 * classname(42); // returns 'Number'
 * classname(NaN); // returns 'NaN'
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
function classname(value) {

    const classname = getclassname(value);

    return (classname === CLASS_OBJECT) ? (constructorname(value) || classname)
         : (classname !== CLASS_NUMBER) ? classname
         : (value === value) ? CLASS_NUMBER
         : CLASS_NAN;
}

module.exports = classname;