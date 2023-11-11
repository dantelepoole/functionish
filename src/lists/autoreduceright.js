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

    let autoreducer = (_, firstvalue) => (autoreducer = reducer, firstvalue);

    const _reducer = (accumulator, nextvalue) => autoreducer(accumulator, nextvalue);

    return reduceright(_reducer, undefined, list);
}

module.exports = curry(1, autoreduceright);
