/**
 * @module lists/any
 */

'use strict';

const curry1 = require('../curry1');
const isvoid = require('../types/isvoid');

/**
 * Apply the *predicate* function to each item in *list* and return `true` when *predicate* returns a truthy value for
 * a *list* item. If *predicate* returns a falsy value for each item, return `false`.
 * 
 * If the *predicate* is <abbr title="null or undefined">void</abbr>, `any()` evaluates the boolish values of the
 * individual *list* items instead. If *predicate* is neither <abbr title="null or undefined">void</abbr> nor a
 * function, an error is thrown.
 * 
 * If the *list* is empty, `any()` returns `false`.
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
 * any(iseven, [1,3,7,42,9]); // returns true
 * 
 * any(null, [0,'',false]); // returns false because no list items are truthy
 * any(null, [1, '', false]); // returns true because the first list item is truthy;
 * 
 * @function any
 * @see {@link module:all all()}
 * @see {@link module:none none()}
 * @param {function} [predicate=undefined] The predicate function
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