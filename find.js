/**
 * @module find
 */

'use strict';

const unary = require('./unary');

/**
 * Function variant of {@link external:Array.prototype.find Array.prototype.find()}. Pass *predicate* to *list*'s
 * `find()` function and return the result.
 * 
 * *Important:* the *predicate* function is coerced to unary arity before it is passed to *list*'s `find()` method
 * (if it exists). This means that *predicate* will only ever receive a single argument (the item being searched),
 * regardless of how many arguments *list*'s `find()` method actually passes.
 * 
 * `find()` is curried by default.
 * 
 * @example
 *     
 * const find = require('functionish/find');
 * 
 * const iseven = x => (x%2) === 0;
 * 
 * find(iseven, [1,2,3,4]); // returns 2
 * find(iseven, [1,3,5]); // returns `undefined`
 * find(iseven, 2); // returns 2
 * find(iseven, 1); // returns `undefined`
 * 
 * @func find
 * @param {function} predicate The predicate function that identifies the item being sought
 * @param {any[]} list An array of items to search
 * @returns {any}
 */
module.exports = require('./curry2')(

    function find(predicate, list) {
        return list.find( unary(predicate) );
    }
)
