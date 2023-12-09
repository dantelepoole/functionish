/**
 * @module lists/all
 */

'use strict';

const curry1 = require('../curry1');
const isvoid = require('../types/isvoid');

/**
 * Functional variant of {@link external:Array.prototype.every() Array.prototype.every()}. Apply the *predicate*
 * function to each item in *list* and return `true` if and only if *predicate* returns `true` each time. Otherwise,
 * return `false`.
 * 
 * If the *predicate* is <abbr title="null or undefined">void</abbr>, `all()` evaluates the boolish values of the
 * individual *list* items instead. If *predicate* is neither <abbr title="null or undefined">void</abbr> nor a
 * function, an error is thrown.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *list*.
 * 
 * `all()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `all()`</caption>
 * 
 * const { all } = require('functionish/lists')
 * 
 * const iseven = x => (x%2) === 0;
 *     
 * all(iseven, [2,4,6]); // returns true
 * all(iseven, [1,42,3]);  // returns true
 * 
 * all(null, [true, 'true', 1]); // returns true because all list items are truthy
 * all(null, [0, 1]); // returns false because the first list item is falsy
 * 
 * @function all
 * @see {@link module:any any()}
 * @see {@link module:none none()}
 * @param {function} [predicate=undefined] The predicate function
 * @param {iterable} list An iterable object producing the items to test
 * @returns {boolean}
 */
const all = curry1(function all(predicate, list) {

    if( isvoid(predicate) ) {
        for(const value of list) if( !value ) return false;
    } else {
        for(const value of list) if( !predicate(value) ) return false;
    }

    return true;
});

module.exports = all;