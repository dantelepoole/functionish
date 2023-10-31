/**
 * @module pluck
 */

'use strict';

const curry = require('./curry');

/**
 * Return the value of the property of *source* specified by *key* or `undefined` if the *key* does not exist on
 * the *source* object.
 * 
 * See {@link module:misc/pluckx pluckx()} for a version that allows plucking properties with compound keys.
 * 
 * `pluck()` is curried by default with unary arity.
 *  
 * @example <caption>Example usage of `pluck()`</caption>
 * 
 * const { pluck } = require('functionish/misc');
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
 * pluck('firstname', source); // returns 'Donald'
 * pluck('creator', source);   // returns the `creator` object
 * pluck('nephews', source);   // returns the `nephews` array
 * 
 * @function pluck
 * @see {@link module:misc/pluckx pluckx()}
 * @param {(string|number|symbol)} key The key of the property to retrieve
 * @param {object} source The object pluck the property from
 * @returns {any}
 */
function pluck(key, source) {
    return source?.[key];
}

module.exports = curry(1, pluck);