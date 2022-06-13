/**
 * @module reduce
 */

'use strict';

const binary = require('./binary');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. If *list* has a `reduce()`
 * method, invoke it with *reducer* and *initialvalue*. Otherwise, *list* is assumed to be iterable and its items
 * are reduced with *reducer* and *initialvalue*.
 * 
 * *Important:* the *list* function is coerced to binary arity before it is passed to *list*'s `reduce()` 
 * method. This means that *reducer* will only ever receive two arguments (the accumulator and the next value),
 * regardless of how many arguments *list*'s `reduce()` method actually passes.
 * 
 * `reduce()` is curried by default.
 * 
 * @example
 * 
 * const reduce = require('functionish/reduce')
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduce(sum, 0, [1,2,3]); // returns 6
 * 
 * @func reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {(reducable|iterable)} list An object with a `reduce()`-method or an iterable object
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, list) {
        
        return (typeof list.reduce === 'function') 
             ? list.reduce( binary(reducer), initialvalue )
             : reduceiterable( reducer, initialvalue, list );
    }
)

function reduceiterable(reducer, initialvalue, iterable) {

    let accumulator = initialvalue;

    for( const item of iterable ) accumulator = reducer(accumulator, item);

    return accumulator;
}