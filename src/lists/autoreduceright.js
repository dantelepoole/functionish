/**
 * @module lists/autoreduceright
 */

'use strict';

const curry = require('../curry');
const reduceright = require('./reduceright');

/**
 * to do
 * 
 * @example <caption>Example usage of `autoreduceright()`</caption>
 * 
 * to do
 * 
 * @function autoreduceright
 */
function autoreduceright(reducer, list) {

    let started = false;

    const autoreducer = (accumulator, nextvalue) => started
                                                  ? reducer(accumulator, nextvalue)
                                                  : (started = true, nextvalue);
    
    return reduceright(autoreducer, undefined, list);
}

module.exports = curry(1, autoreduceright);
