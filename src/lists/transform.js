/**
 * @module lists/transform
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const curry2 = require('../curry2');

function transform(transformer, list) {

    return {

        [Symbol.iterator] : function* () {

            for(const value of list) {

                const result = transformer(value);

                if(result !== TRANSFORM_REJECT) yield result;
            }
        }
    }
}

module.exports = curry2(transform);