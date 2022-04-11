/**
 * @module reduce
 */

'use strict';

const isiterable = require('./isiterable');

const asobject = Object;
const isreducable = value => (typeof value?.reduce === 'function');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}, except that `reduce()` can
 * also reduce objects.
 * 
 * If *list* has a `reduce()` method, it is invoked with *reducer* and *initialvalue* and the result is returned. If
 * *list* is iterable, each item in *list* is reduced. Otherwise, *list* is reduced as an object by passing each
 * property of *list* to the reducer as a [key, value] array.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.reduce Array.prototype.reduce()} passes
 * additional arguments to a `reducer` further to the `accumulator` and `nextvalue` argument. This can lead to
 * unexpected behaviour in certain cases, especially if the reducer is curried or accepts spread 
 * and/or default parameters. In such cases you can apply the {@link module:binary binary()} function to ensure the
 * reducer is always passed exactly two arguments and no more or less.
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
 * @see {@link module:binary binary()}
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {(array|iterable|object)} list The list of items to reduce
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, list) {

        return isreducable(list) ? list.reduce(reducer, initialvalue, list )
             : isiterable(list) ? reduceiterable(reducer, initialvalue, list)
             : reduceobject(reducer, initialvalue, asobject(list))
    }
)

function reduceiterable(reducer, initialvalue, iterable) {

    let accumulator = initialvalue;

    for( const item of iterable ) accumulator = reducer(accumulator, item);

    return accumulator;
}

function reduceobject(reducer, initialvalue, object) {

    let accumulator = initialvalue;

    Object.entries(object).forEach(
        entry => { 
            accumulator = reducer(accumulator, entry)
        }
    )

    return accumulator;
}