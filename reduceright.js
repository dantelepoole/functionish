/**
 * @module reducericht
 */

'use strict';

const ERR_BAD_REDUCABLE = `ReduceRightError~The reducable has type %s. Expected an object with a reduceRight() method or an iterable object.`;

const binary = require('./binary');

const fail = require('./fail');
const isfunction = require('./isfunction');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const reverse = require('./reverse');
const typeorclass = require('./typeorclass');

const isreducable = reducable => isfunction(reducable?.reduceRight);

/**
 * Functional variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. If *reducable* has a
 * `reduceRight()` method, invoke it with *reducer* and *initialvalue*. Otherwise, if *reducable* is iterable, reduce its
 * items with *reducer* and *initialvalue*, starting at the last item and working back to the first item.
 * 
 * *Important:* the *reducable* function is coerced to binary arity before it is passed to *reducable*'s `reduceRight()` 
 * method. This means that *reducer* will only ever receive two arguments (the accumulator and the next value),
 * regardless of how many arguments *reducable*'s `reduceRight()` method actually passes.
 * 
 * `reduceRight()` is curried by default with ternary arity.
 * 
 * @example
 * 
 * const reduceright = require('functionish/reduceright');
 * const range = require('functionish/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduceright(sum, 0, [1,2,3]); // returns 6
 * reduceright(sum, 0, range(3)); //returns 6
 * 
 * @func reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {reducable} reducable An object with a `reduce()`-method or an iterable object
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, reducable) {

        reducer = resolvefunction(reducer);
        
        return isreducable(reducable) ? reducable.reduceRight( binary(reducer), initialvalue )
             : isiterable(reducable) ? reducerightiterable( reducer, initialvalue, reducable )
             : fail(ERR_BAD_REDUCABLE, typeorclass(reducable));
    }
)

function reducerightiterable(reducer, initialvalue, iterable) {

    iterable = reverse(iterable);

    let accumulator = initialvalue;

    for(const item of iterable) accumulator = reducer(accumulator, item);

    return accumulator;
}