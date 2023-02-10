/**
 * @module lists/transform
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const curry2 = require('../curry2');
const isarray = require('../types/isarray');

function transform(transformer, list) {

    const transformedlist = transformiterable(transformer, list);

    return isarray(list)
         ? Array.from(transformedlist)
         : transformedlist;
}

function transformiterable(transformer, list) {

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