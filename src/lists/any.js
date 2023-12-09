/**
 * @module lists/any
 */

'use strict';

const curry1 = require('../curry1');
const isvoid = require('../types/isvoid');

/**
 * Apply the *predicate* function to each item in *list* and return `true` when *predicate* returns a truthy value. If
 * *predicate* returns a falsy value for each item, return `false`.
 * 
 * [to do: predicate is function or void]
 * 
 * The function is short-circuited, so it returns `true` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * `any()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `any()`</caption>
 * 
 * const { any } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * any(iseven, [1,3,7,42,9]); // returns `true`
 * 
 * @function any
 * @see {@link module:all all()}
 * @see {@link module:none none()}
 * @param {function} predicate The predicate function
 * @param {iterable} list An iterable object producing items to test
 * @returns {boolean}
 */
const any = curry1(function any(predicate, list) {

    if( isvoid(predicate) ) {
        for(const value of list) if(value) return true;
    } else {
        for(const value of list) if( predicate(value) ) return true;
    }

    return false;
});

module.exports = any;