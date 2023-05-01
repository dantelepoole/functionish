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

    let isaborted = false;
    const abort = result => (isaborted = true, result);
    
    let accumulator = initialvalue;

    for(const nextvalue of list) {

        accumulator = reducer(accumulator, nextvalue, abort);

        if(isaborted) break;
    }

    return accumulator;
}

function reduceself(reducer, list) {

    return (arguments.length === 1)
         ? reduce( selfreducer(reducer), undefined )
         : reduce( selfreducer(reducer), undefined, list );
}

function selfreducer(reducer) {

    let reducenext = (_,nextvalue) => (reducenext=reducer, nextvalue);

    return (...args) => reducenext(...args);
}

module.exports = curry(2, reduce);
module.exports.self = reduceself;
