/**
 * @module typeorclass
 */

'use strict';

const classname = require('./classname');

/**
 * Return *value*'s Javascript type if *value* is not an object, otherwise return the name of *value*'s class.
 * 
 * Note that if *value* is a generic object, this function returns `'Object'` (capitalized) instead of `'object'`. Also,
 * If *value* is `null`, this function returns `'null'` instead of `'object'`.
 * 
 * @example
 * 
 * const typeorclass = require('functionish/typeorclass');
 * 
 * typeorclass(42); // returns 'number'
 * typeorclass(true); // returns 'boolean'
 * typeorclass(null); // returns 'null'
 * typeorclass({}); // returns 'Object'
 * typeorclass( new Date() ); // returns 'Date'
 * 
 * class Foobar {}
 * class SubFoobar extends Foobar {}
 * 
 * typeorclass(Foobar); // returns 'function'
 * typeorclass( new Foobar() ); // returns 'Foobar'
 * typeorclass( new SubFoobar() ); // returns 'SubFoobar'
 * 
 * @function typeorclass
 * @see {@link module:classname classname()}
 * @param {any} value The value whose type or classname to return
 * @returns {string}
 */
module.exports = function typeorclass(value) {

    const type = typeof value;

    return (type !== 'object') ? type
         : (value ===  null) ? 'null'
         : classname(value);
}