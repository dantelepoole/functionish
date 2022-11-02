/**
 * @module transform/transformation
 */

'use strict';

const ERR_BAD_TRANSFORMER = `TransformationError~The transformer at index %i has type %s. Expected a function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const fail = require('../fail');
const map = require('../map');
const notboolean = require('../notboolean');
const notfunction = require('../notfunction');
const typeorclass = require('./typeorclass');

module.exports = function transformation(...transformers) {

    transformers = map( transformervalidatorfactory(), transformers );

    const _functionish_transformation_ = value => applytransformers(transformers, value);
    
    return _functionish_transformation_;
}

function applytransformers(transformers, value) {

    for(let index = 0; index < transformers.length; index += 1) {

        const result = transformers[index](value);

        value = notboolean(result) ? result
              : result ? value
              : TRANSFORM_REJECT;

        if(value === TRANSFORM_REJECT) break;
    }

    return value;
}

function transformervalidatorfactory() {

    let index = 0; 

    return function transformervalidator(transformation) {
        
        notfunction(transformation) && fail(ERR_BAD_TRANSFORMER, index, typeorclass(transformation));

        index += 1;

        return transformation;
    }
}