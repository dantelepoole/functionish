/**
 * @module misc/dedupfilter
 */

'use strict';

const FILTER_DUPLICATE_VALUE = false;
const FILTER_UNIQUE_VALUE = true;

const compose = require('../compose');
const isfunction = require('../types/isfunction');

/**
 * Return a filter function that accepts only unique values and rejects duplicates. If no *hashfunc*
 * is passed, the filter compares values using strict equality. Otherwise, it compare values by the
 * hash values returned by *hashfunc*.
 * 
 * The returned filter function maintains a cache of all values passed through the filter. So you should never keep
 * a dedupfilter-instance around indefinitely, that would cause a memory leak. Instead, call `dedupfilter()` to create a
 * new filter each time you need one and let the garbage collector collect it as soon as you are finished with it.
 * 
 * For the same reason, a dedupfilter-instance is not reusable, since on subsequent runs it will recognize the values
 * from earlier runs as being duplicates.
 * 
 * @example <caption>Example usage of `dedupfilter()`</caption>
 * 
 * const { dedupfilter } = require('functionish/misc');
 * 
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( dedupfilter() ); // returns [1,2,3,4,5]
 * 
 * @example <caption>Example usage of `dedupfilter()` with a hashing function</caption>
 * 
 * const { dedupfilter } = require('functionish/misc');
 * 
 * function getuniqusers(users) {
 *     return users.filter( user => user.id );
 * }
 * 
 * @function dedupfilter
 * @param {function} [hashfunc] The hashing function
 * @returns {function}
 */
function dedupfilter(hashfunc) {

    const dedupset = new Set();

    const _dedupfilter = value => ! (dedupset.has(value) || void(dedupset.add(value)));

    return isfunction(hashfunc)
         ? compose(_dedupfilter, hashfunc)
         : _dedupfilter;

}


module.exports = dedupfilter;