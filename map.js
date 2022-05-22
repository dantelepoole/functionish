/**
 * @module map
 */

'use strict';

const mapiterable = require('./mapiterable');
const unary = require('./unary');

/**
 * Functional variant of {@link external:Array.prototype.map Array.prototype.map()}. Pass *func* to *list*'s
 * `map()`-method and return the result. If *list* does not have a `map()` method, it is assumed to be iterable and
 * an iterable object is returned that applies *func* to each item produced by *list*.
 * 
 * *Important:* the *func* function is coerced to unary arity before it is passed to *list*'s `map()` method. This
 * means that *func* will only ever receive a single argument (the item being mapped), regardless of how many arguments
 * *list*'s `map()` method actually passes.
 * 
 * `map()` is curried by default.
 * 
 * @example
 * 
 * const map = require('functionish/map');
 * 
 * const double = x => (x*2);
 * 
 * map(double, [1,2,3]); // returns [2,4,6]
 *     
 * const obj = { a:42, b:30 }
 * map(double, obj); // returns { a:84, b:60 }
 * 
 * @func map
 * @see {@link external:Array.prototype.map Array.prototype.map()}
 * @see {@link module:unary unary()}
 * @param {function} func The function to apply to each item in *list*
 * @param {(mappable|iterable)} list An object with a `map()` method or an iterable object
 * @returns {any}
 */

module.exports = require('./curry2')(

    function map(func, list) {
        return (typeof list.map === 'function') ? list.map( unary(func) ) : mapiterable(func, list);
    }
)