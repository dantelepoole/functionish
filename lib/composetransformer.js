/**
 * @module lib/composetransformer
 * @ignore
 */

'use strict';

const ERR_BAD_TRANSFORMER_AT_INDEX = `ComposeTransformerError~The transformer at index %d as type %s. Expected a function.`;

const fail = require('../fail');
const typeorclass = require('../typeorclass');

module.exports = function composetransformer(...transformers) {

    validatetransformers(transformers);

    const transformercount = transformers.length;

    return function compositetransformer(value) {

        for(let index = 0; index < transformercount; index += 1) {

            const transformedvalue = transformers[index](value);

            if(transformedvalue === true) continue;
            else if(transformedvalue === false) return false;

            value = transformedvalue;
        }

        return value;
    }
}

function validatetransformers(transformers) {

    for(let index = 0; index < transformers.length; index += 1) {

        const transformer = transformers[index];
        if(typeof transformer !== 'function') fail(ERR_BAD_TRANSFORMER_AT_INDEX, index, typeorclass(transformer));
    }
}