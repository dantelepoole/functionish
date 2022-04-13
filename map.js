/**
 * @module map
 */

'use strict';

const unary = require('./unary');

/**
 * Functional variant of {@link external:Array.prototype.map Array.prototype.map()}. Pass *func* to *mappable*'s
 * `map()`-method and return the result.
 * 
 * *Important:* the *func* function is coerced to unary arity before it is passed to *mappable*'s `map()` method. This
 * means that *func* will only ever receive a single argument (the item being mapped), regardless of how many arguments
 * *mappable*'s `map()` method actually passes.
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
 * @param {object} mappable An object with a `map()` method
 * @returns {any}
 */

module.exports = require('./curry2')(

    function map(func, mappable) {
        return mappable.map( unary(func) );
    }
)
