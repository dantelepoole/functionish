/**
 * @module filter
 */

 'use strict';
 
 const unary = requier('./unary');

 const isfilterable = value => (typeof value?.filter === 'function');

/**
 * Function variant of `Array.prototype.filter()`. Apply the *predicate* function to each item in *list* and return
 * an array containing only the items for which *predicate* returns a truthy value.
 * 
 * If *list* has a `filter()` method, this function passes *predicate* to it. Otherwise, *list*
 * is converted to a single-item array and *predicate* is passed to its `filter()`-method.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *list*'s `filter()` method
 * (if it exists). This means that *predicate* will only ever receive a single argument (the item being filtered),
 * regardless of how many arguments *list*'s `filter()` method actually passes.
 * 
 * `filter()` is curried by default.
 * 
 * @example
 * 
 * const filter = require('functionish/filter')
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * filter(iseven, [1,2,3,4,5]); // returns [2,4]
 * 
 * const object = {
 *    'a' : 42,
 *    'b' : 43,
 *    'c' : 44
 * }
 * 
 * filter(iseven, object); // returns { 'a':42, 'c':44 }
 * 
 * @func filter
 * @see {@link external:Array.prototype.filter Array.prototype.filter()}
 * @param {function} predicate The predicate function
 * @param {(any[]|any)} list The items to filter
 * @returns {any[]}
 */

module.exports = require('./curry2')(

    function filter(predicate, list) {

        predicate = unary(predicate);

        return isfilterable(list) ? list.filter(predicate) : [ list ].filter(predicate);
    }
)

