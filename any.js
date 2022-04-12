/**
 * @module any
 */

'use strict';

const unary = require('./unary');

/**
 * Apply the *predicate* function to each item in *list* and return `true` when *predicate* returns a truthy value. If
 * *predicate* returns a falsy value for each item, return `false`.
 * 
 * The function is short-circuited, so it returns `true` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * `any()` is curried by default.
 * 
 * @example
 * 
 * const any = require('functionish/any')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * any(iseven, [1,3,7,42,9]); // returns `true`
 * 
 * @func any
 * @see {@link module:all all()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {any[]} list An array of items to test
 * @returns {boolean}
 */

module.exports = require('./curry2')(

    function any(predicate, list) {
        return list.some( unary(predicate) );
    }
    
)
