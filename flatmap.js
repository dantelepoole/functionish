/**
 * @module flatmap
 */

'use strict';

const flip = require('./flip');
const unary = require('./unary');

const isflatmappable = value => (typeof value?.flatMap === 'function');

/**
 * Function variant of {@link external:Array.prototype.flatMap Array.prototype.flatMap()}. Map *func* to each item in
 * *list* and flatten the result. If *list* does not have a `flatMap()`-method, it is converted to a single-item
 * array and *func* is passed to its `flatMap()` method.
 * 
 * *Important:* the *funcs* function is coerced to unary arity before it is passed to *list*'s `flatMap()` method
 * (if it exists). This means that *func* will only ever receive a single argument (the item being filtered),
 * regardless of how many arguments *list*'s `flatMap()` method actually passes.
 * 
 * `flatmap()` is curried by default.
 * 
 * @func flatmap
 * @see {@link external:Array.prototype.flatMap Array.prototype.flatMap()}
 * @param {function} func The function to map to *list*
 * @param {(any[]|any)} list The array or iterable object to flatmap
 * @returns {any[]}
 */
module.exports = require('./curry2')(
    
    function flatmap(func, list) {

        func = unary(func);

        return isflatmappable(list) ? list.flatMap(func) : [list].flatMap(func);
    }
)