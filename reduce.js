/**
 * @module reduce
 */

'use strict';

const binary = require('./binary');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}.
 * 
 * *Important:* the *reducer* function is coerced to binary arity before it is passed to *reducable*'s `reduce()` 
 * method. This means that *reducer* will only ever receive two arguments (the accumulator and the next value),
 * regardless of how many arguments *reducable*'s `reduce()` method actually passes.
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
 * @param {object} reducable An object with a `reduce()`-method
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, reducable) {
        return reducable.reduce( binary(reducer), initialvalue );
    }
)