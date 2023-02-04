/**
 * @module arrays/collect
 */

'use strict';

/**
 * Return an array containing the *items*.
 * 
 * @example <caption>Example usage of `collect()`</caption>
 * 
 * const {collect} = require('functionish/arrays');
 * 
 * collect(1,2,3,4,5); // returns [1,2,3,4,5]
 * 
 * @function collect
 * @see {@link module:lists/array array()}
 * @param {...any[]} items The items to collect to an array
 * @returns {any[]}
 */
function collect(...items) {
    return items;
}

module.exports = collect;