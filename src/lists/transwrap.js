/**
 * @module lists/transwrap
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const curry2 = require('../curry2');

function transwrap(transformer, func) {

    return function _transwrap(value) {

        const result = transformer(value);

        if(result !== TRANSFORM_REJECT) return func(result);
    }
}

module.exports = curry2(transwrap);