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

    let autoreducer = (_, firstvalue) => (autoreducer = reducer, firstvalue);

    const _reducer = (accumulator, nextvalue) => autoreducer(accumulator, nextvalue);

    return reduce(_reducer, undefined, list);
}

module.exports = curry(1, autoreduce);
