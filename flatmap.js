/**
 * @module flatmap
 */

'use strict';

const unary = require('./unary');

/**
 * Functional variant of {@link external:Array.prototype.flatMap Array.prototype.flatMap()}. Map *func* to each item in
 * *list* and flatten the result. This function calls *list*'s `flatMap()` method or, if no such method exists, *list*'s
 * `flatmap()` method.
 *  
 * *Important:* the *funcs* function is coerced to unary arity before it is passed to *list*'s `flatMap()` method.
 * This means that *func* will only ever receive a single argument (the item being filtered),
 * regardless of how many arguments *list*'s `flatMap()` method actually passes.
 * 
 * `flatmap()` is curried by default.
 * 
 * @func flatmap
 * @see {@link external:Array.prototype.flatMap Array.prototype.flatMap()}
 * @param {function} func The function to map to *list*
 * @param {any[]} list The array of items to flatmap
 * @returns {any[]}
 */
module.exports = require('./curry2')(
    
    function flatmap(func, list) {

        const flatmapfunc = (list.flatMap ?? list.flatmap).bind(list);
        return flatmapfunc( unary(func) );
    }
)