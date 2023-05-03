/**
 * @module lists/reduceright
 */

'use strict';

const curry = require('../curry');
const partial = require('../partial');

const bootstrapreduce = (reducer, list) => (list === undefined)
                                         ? partial( reduceright, bootstrapreducer(reducer), undefined )
                                         : reduceright( bootstrapreducer(reducer), undefined, list );
/**
 * to do
 * 
 * @example <caption>Example usage of `reduceright()`</caption>
 * 
 * to do
 * 
 * @function reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */
function reduceright(reducer, initialvalue, list) {

    const array = [...list].reverse();

    let isaborted = false;
    const abort = result => (isaborted = true, result);
    
    let accumulator = initialvalue;

    for(let index = array.length-1; index >= 0; index -= 1) {

        accumulator = reducer(accumulator, array[index], abort);

        if(isaborted) break;
    }

    return accumulator;
}

function bootstrapreducer(reducer) {

    let reducenext = (_,nextvalue) => (reducenext=reducer, nextvalue);

    return (...args) => reducenext(...args);
}

module.exports = curry(2, reduceright);
module.exports.bootstrap = bootstrapreduce;