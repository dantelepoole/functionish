/**
 * @module pluckx
 */

'use strict';

const SEPARATOR_CHAR = '.';
const SOURCE_VOID = undefined;

const curry = require('./curry');
const isstring = require('./types/isstring');
const isvoid = require('./types/isvoid');

const pluckreducer = (source, key) => isvoid(source)
                                    ? SOURCE_VOID
                                    : source[key];

/**
 * Return the value of the property of *source* specified by *path*.
 * 
 * The *path* argument may be a compound path, i.e. a path that goes multiple levels deep. In that case, the
 * individual property keys should be separated by a `.`.
 * 
 * The *path* may also be an array of individual property keys. In this case, each path element should be
 * a single property key. This also allows you to access non-string properties (e.g. to index an array property,
 * as illustrated in the example below).
 * 
 * If the *path* is invalid or if any intermediate property is `null` or `undefined`, `undefined` is returned.
 * 
 * `pluckx()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `pluckx()`</caption>
 * 
 * const { pluckx } = require('functionish/misc');
 * 
 * const source = {
 *   firstname : 'Donald',
 *   lastname  : 'Duck',
 *   nephews  : [
 *      { firstname: 'Huey', lastname: 'Duck' },
 *      { firstname: 'Dewey', lastname: 'Duck' },
 *      { firstname: 'Louie', lastname: 'Duck' }
 *   ],
 *   creator : {
 *       name : 'Walt Disney',
 *       born : {
 *           year : 1901,
 *           city : 'Chicago'
 *       }
 *   }
 * }
 * 
 * pluckx('firstname', source);         // returns 'Donald'
 * pluckx('creator.born.city', source); // returns 'Chicago'
 * pluckx('nephews.length', source);    // returns 3
 * pluckx( 'wife', source );            // returns undefined
 * 
 * @example <caption>Example usage of `pluckx()` to index an array</caption>
 * 
 * pluckx( ['nephews', 1, 'firstname' ], source); // returns 'Dewey'
 * 
 * @function pluckx
 * @param {(string|any[])} path The path of the property to retrieve
 * @param {object} source The object to resolve *path* against
 * @returns {any}
 */
function pluckx(path, source) {

    isstring(path) && (path = path.split(SEPARATOR_CHAR));

    return path.reduce(pluckreducer, source);

}

module.exports = curry(1, pluckx);