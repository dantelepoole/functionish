/**
 * @module lists/reduceright
 */

'use strict';

const TYPE_FUNCTION = 'function';

const curry = require('../curry');

const isfunction = x => (typeof x === TYPE_FUNCTION);

/**
 * Reduce the values in *list* in reverse order starting with the *initialvalue* and using the
 * *reducer* function.
 * 
 * If *list* is an array, this function calls its {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}
 * method and returns the result. However, the *predicate* function will only ever be called with a single
 * argument (the current list item), not the additional arguments that {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}
 * passes to its function.
 * 
 * If *list* is not an array, it is presumed to be an iterable object.
 * 
 * `reduceright()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * const { reduceright } = require('functionish/lists');
 * 
 * const add = (a,b) => (a+b);
 * 
 * reduceright(sum, 0, [1,2,3]); // returns 6
 * 
 * @function reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, list) {

    return isfunction(list.reduceRight)
         ? list.reduceRight( x => reducer(x), initialvalue )
         : [...list].reduceRight( unary(reducer), initialvalue );
}

module.exports = curry(2, reduceright);