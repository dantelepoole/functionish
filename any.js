/**
 * @module any
 */

'use strict';

const isarray = require('./isarray');
const isiterable = require('./isiterable');

/**
 * Apply the *predicate* function to each item in *list* and return `true` when *predicate* returns a truthy value. If
 * *predicate* returns a falsy value for each item, return `false`.
 * 
 * The *list* argument may be either an array or an iterable object. If *list* is neither, it is passed directly to
 * *predicate* and the result is returned as the result of `any()`.
 * 
 * The function is short-circuited, so it returns `true` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.some Array.prototype.some()} (which
 * `any()` relies on for Array *list* arguments) passes
 * additional arguments to the *predicate* function further to the list item being evaluated. This can lead to
 * unexpected behaviour in certain cases, especially if the *predicate* function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the *predicate* function is always passed exactly one argument and no more.
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
 * @param {(array|iterable|any)} list The list of items to test
 * @returns {boolean}
 */

module.exports = require('./curry2')(

    function any(predicate, list) {

        return isarray(list) ? list.some(predicate)
            : isiterable(list) ? iterablesome(predicate, list)
            : !! predicate(list);
    }
    
)

function iterablesome(func, iterable) {

    for( const value of iterable ) if( !! func(value) ) return true;

    return false;
}
