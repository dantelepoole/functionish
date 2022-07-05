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