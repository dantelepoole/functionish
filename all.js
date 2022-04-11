/**
 * @module all
 */

'use strict';

const isarray = require('./isarray');
const isiterable = require('./isiterable');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns `true`
 * each time. Otherwise, return `false`.
 * 
 * The *list* argument may be either an array or an iterable object. If *list* is neither, it is passed directly to
 * *predicate* and the result is returned as the result of `all()`.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a falsy value, without
 * evaluating any remaining items in *list*.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.every Array.prototype.every()} (which
 * `all()` relies on for Array *list* arguments) passes
 * additional arguments to the *predicate* function further to the list item being evaluated. This can lead to
 * unexpected behaviour in certain cases, especially if the *predicate* function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the *predicate* function is always passed exactly one argument and no more.
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
 * @param {(array|iterable|any)} list The list of items to test
 * @returns {boolean}
 */
module.exports = require('./curry2')(

    function all(predicate, list) {

        return isarray(list) ? list.every(predicate)
            : isiterable(list) ? iterableall(predicate, list)
            : !! predicate(list);
    }
)

function iterableall(func, iterable) {

    for( const value of iterable ) if( ! func(value) ) return false;

    return true;
}
