/**
 * @module lists/reduce
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('../curry');

const isfunction = x => (typeof x === TYPE_FUNCTION);

/**
 * Reduce the values in *list* starting with the *initialvalue* and using the *reducer* function.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.reduce Array.prototype.reduce()}
 * method and returns the result. However, the *predicate* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.reduce Array.prototype.reduce()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `reduce()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `reduce()`</caption>
 * 
 * const { reduce } = require('functionish/lists');
 * 
 * const add = (a,b) => (a+b);
 * 
 * reduce(add, 0, [1,2,3]); // returns 6
 * 
 * @function reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */
function reduce(reducer, initialvalue, list) {

    return isfunction(list.reduce)
         ? list.reduce( x => reducer(x), initialvalue )
         : reduceiterable(reducer, initialvalue, list);
}

function reduceiterable(reducer, initialvalue, list) {

    let result = initialvalue;

    for(const value of list) result = reducer(result, value);

    return result;
}

module.exports = curry(2, reduce);