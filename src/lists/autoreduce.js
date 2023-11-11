/**
 * @module lists/autoreduce
 */

'use strict';

const curry = require('../curry');
const reduce = require('./reduce');

/**
 * to do
 * 
 * @example <caption>Example usage of `autoreduce()`</caption>
 * 
 * to do
 * 
 * @function autoreduce
 */
function autoreduce(reducer, list) {

    let started = false;

    const autoreducer = (accumulator, nextvalue) => started
                                                  ? reducer(accumulator, nextvalue)
                                                  : (started = true, nextvalue);

    return reduce(autoreducer, undefined, list);
}

module.exports = curry(1, autoreduce);
