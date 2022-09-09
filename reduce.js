/**
 * @module reduce
 */

'use strict';

const ERR_BAD_REDUCABLE = `ReduceError~The reducable has type %s. Expected an object with a reduce() method or an iterable object.`;

const binary = require('./binary');

const fail = require('./fail');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. If *reducable* has a
 * `reduce()` method, invoke it with *reducer* and *initialvalue*. Otherwise, if *reducable* is iterable, reduce its
 * items with *reducer* and *initialvalue*.
 * 
 * *Important:* the *reducable* function is coerced to binary arity before it is passed to *reducable*'s `reduce()` 
 * method. This means that *reducer* will only ever receive two arguments (the accumulator and the next value),
 * regardless of how many arguments *reducable*'s `reduce()` method actually passes.
 * 
 * `reduce()` is curried by default with ternary arity.
 * 
 * @example
 * 
 * const reduce = require('functionish/reduce');
 * const range = require('functionish/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduce(sum, 0, [1,2,3]); // returns 6
 * reduce(sum, 0, range(3)); //returns 6
 * 
 * @func reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {reducable} reducable An object with a `reduce()`-method or an iterable object
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, reducable) {

        reducer = resolvefunction(reducer);
        
        return (typeof reducable?.reduce === 'function') ? reducable.reduce( binary(reducer), initialvalue )
             : isiterable(reducable) ? reduceiterable( reducer, initialvalue, reducable )
             : fail(ERR_BAD_REDUCABLE, typeorclass(reducable));
    }
)

function reduceiterable(reducer, initialvalue, iterable) {

    let accumulator = initialvalue;

    for( const item of iterable ) accumulator = reducer(accumulator, item);

    return accumulator;
}