/**
 * @module lists/reduce
 */

'use strict';

const curry = require('../curry');
const partial = require('../partial');

const bootstrapreduce = (reducer, list) => (list === undefined)
                                         ? partial( reduce, bootstrapreducer(reducer), undefined )
                                         : reduce( bootstrapreducer(reducer), undefined, list );
/**
 * to do
 * 
 * @example <caption>Example usage of `reduce()`</caption>
 * 
 * to do
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

function bootstrapreducer(reducer) {

    let reducenext = (_,nextvalue) => (reducenext=reducer, nextvalue);

    return (accumulator, nextvalue, abort) => reducenext(accumulator, nextvalue, abort);
}

module.exports = curry(2, reduce);
module.exports.bootstrap = bootstrapreduce;
