/**
 * @module types/typeorclassname
 */

'use strict';

const TYPE_OBJECT = 'object';

const classname = require('./classname');
const type = require('./type');

/**
 * Return *value*'s Javascript type if *value* is not an object, otherwise return the name of *value*'s class.
 * 
 * If *value* is a generic object, this function returns `'Object'` (capitalized) instead of `'object'`. Also,
 * If *value* is `null`, this function returns `'Null'`.
 * 
 * @example <caption>Example usage of `typeorclassname()`</caption>
 * 
 * const { typeorclassname } = require('functionish/types');
 * 
 * typeorclassname(42); // returns 'number'
 * typeorclassname(NaN); // return 'NaN'
 * typeorclassname(true); // returns 'boolean'
 * typeorclassname(null); // returns 'Null'
 * typeorclassname({}); // returns 'Object'
 * typeorclassname( new Date() ); // returns 'Date'
 * 
 * class Foobar {}
 * class SubFoobar extends Foobar {}
 * 
 * typeorclassname(Foobar); // returns 'function'
 * typeorclassname( new Foobar() ); // returns 'Foobar'
 * typeorclassname( new SubFoobar() ); // returns 'SubFoobar'
 * 
 * @function typeorclassname
 * @see {@link module:types/type type()}
 * @see {@link module:types/classname classname()}
 * @param {any} value The value whose type or classname to return
 * @returns {string}
 */
function typeorclassname(value) {

    const valuetype = type(value);

    return (valuetype === TYPE_OBJECT) ? classname(value) : valuetype;
}

module.exports = typeorclassname;