/**
 * @module reduce
 */

'use strict';

const binary = require('./binary');

const asobject = Object;
const isreducable = value => (typeof value?.reduce === 'function');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}, except that `reduce()` can
 * also reduce objects.
 * 
 * If *list* has a `reduce()` method, it is invoked with *reducer* and *initialvalue* and the result is returned. 
 * Otherwise, *list* is reduced as an object by passing each property of *list* to the reducer as a [key, value] array.
 * 
 * *Important:* the *reducer* function is coerced to binary arity before it is passed to *list*'s `reduce()` method
 * (if it exists). This means that *reducer* will only ever receive two arguments (the accumulator and the next value),
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
 * const objectreducer = (accumulator, entry) => (accumulator + entry[1]);
 * const obj = { a:42, b:24 };
 * reduce(objectreducer, 0, obj); // returns 66
 * 
 * @func reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {(array|object)} list The list of items to reduce
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, list) {

        return isreducable(list) ? list.reduce( binary(reducer), initialvalue, list )
             : reduceobject(reducer, initialvalue, asobject(list))
    }
)

function reduceobject(reducer, initialvalue, object) {

    let accumulator = initialvalue;

    Object.entries(object).forEach(
        entry => { 
            accumulator = reducer(accumulator, entry)
        }
    )

    return accumulator;
}