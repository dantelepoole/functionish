/**
 * @module none
 */

'use strict';

const any = require('./any');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()} (in fact, it simply calls `any()`
 * and negates the result).
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * `none()` is curried by default.
 * 
 * @func none
 * @see {@link module:any any()}
 * @see {@link module:all all()}
 * @param {function} predicate The function to test the items in *list* with
 * @param {any[]} list An array of items to test
 * @returns {boolean}
 * @example
 * 
 * const none = require('functionish/none')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * none(iseven, [1,3,7,42,9]); // returns `false`
 * none(iseven, [1,3,7,9]); // returns `true`
 * 
 */
module.exports = require('./curry2')(
    
    function none(predicate, list) {
        return ! any(predicate, list)
    }
)