/**
 * @module all
 */

'use strict';

const isarray = require('./isarray');
const unary = require('./unary');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns `true`
 * each time. Otherwise, return `false`.
 * 
 * If *list* is not an array, it is passed directly to *predicate* and the result is returned as the result of `all()`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *list*.
 * 
 * `all()` is curried by default.
 *
 * @example
 * 
 * const all = require('functionish/all')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * all(iseven, [2,4,6]); // returns `true`
 * all(iseven, [1,42,3]);  // returns `false`
 * 
 * @func all
 * @see {@link module:any any()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {(any[]|any)} list The list of items to test
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function all(predicate, list) {
        return isarray(list) ? list.every( unary(predicate) ) : !! predicate(list);
    }
)
