/**
 * @module lists/uniq
 */

'use strict';

const curry = require('../curry');
const filter = require('./filter');
const uniqfilter = require('../misc/uniqfilter');

/**
 * to do
 * 
 * @example <caption>Example usage of `uniq()`</caption>
 * 
 * to do
 * 
 * @function uniq
 * @param {function} [hashfunc] An optional hashing function
 * @param {iterable} sourcelist An iterable object producing the items to deduplicate
 * @returns {iterable}
 */
function uniq(hashfunc, sourcelist) {
    return filter( uniqfilter(hashfunc), sourcelist );
}

module.exports = curry(1, uniq);