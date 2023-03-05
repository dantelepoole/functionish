/**
 * @module lists/iterate
 */

'use strict';

const curry = require('../curry');
const isarray = require('../types/isarray');
const unary = require('../unary');

/**
 * Pass each item in *list* to the *func* function and return the *list*.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.forEach Array.prototype.forEach()}
 * method and returns the result. However, the *mapfunc* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.forEach Array.prototype.forEach()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be iterable and an iterable object is returned
 * that operates lazily.
 * 
 * `iterate()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `iterate()`</caption>
 *     
 * const { iterate } = require('functionish/lists');
 * 
 * iterate(console.log, [1,2,3]); // prints `2`, `4` and `6`
 *     
 * @function iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} list An iterable object
 * @returns {iterable} *list*
 */
function iterate(func, list) {

    isarray(list) ? list.forEach( unary(func) )
                  : iterateiterable(func, list)

    return list;
}

function iterateiterable(func, list) {
    for(const value of list) func(value);
}

module.exports = curry(1, iterate);