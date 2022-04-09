'use strict';

const any = require('./any');

/**
 * Apply the *predicate* function to each item in *list* and return `true` if and only if *predicate* returns a falsy
 * value for each item. This function is the counterpart to {@link module:any any()} (in fact, it simply calls `any()`
 * and negates the result).
 * 
 * The *list* argument may be either an array or an iterable object. If *list* is neither, it is passed directly to
 * *predicate* and `true` is returned if *predicate* returns a falsy value.
 * 
 * The function is short-circuited, so it returns `false` as soon as the *predicate* returns a truthy value, without
 * evaluating any remaining items in *list*.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.some Array.prototype.some()} (which
 * `none()` relies on for Array *list* arguments) passes
 * additional arguments to the *predicate* function further to the list item being evaluated. This can lead to
 * unexpected behaviour in certain cases, especially if the *predicate* function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the *predicate* function is always passed exactly one argument and no more.
 * 
 * `none()` is curried by default.
 * 
 * @module none
 * @see {@link module:any any()}
 * @see {@link module:all all()}
 * @param {function} predicate The function to test the items in *list* with
 * @param {(array|iterable|any)} list The list of items to test
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