/**
 * @module lists/transduce
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const curry2 = require('../curry2');

function transduce(transformer, reducer) {

    return function _transformreducer(current, nextvalue) {

        nextvalue = transformer(nextvalue);

        return (nextvalue !== TRANSFORM_REJECT)
             ? reducer(current, nextvalue)
             : current;
    }
}

module.exports = curry2(transduce);