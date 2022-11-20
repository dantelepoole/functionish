/**
 * @module transformation
 */

'use strict';

const ERR_BAD_TRANSFORMER = `TransformationError~The transformer at index %i has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMERS = `TransformationError~The transformers argument has type %s. Expected an array of function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation';

const fail = require('./fail');
const isfunction = require('./isfunction');
const notarray = require('./notarray');
const notboolean = require('./notboolean');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const istransformation = transformation => isfunction(transformation) && (transformation.name === TRANSFORMATION_NAME);

/**
 * Return a transformation function that accepts a single value, applies the *transformer* in order and returns the
 * result. Only intended to be used with {@link module:transform transform()}, {@link module:transduce transduce()}
 * and {@link module:transducer transducer()}.
 * 
 * A *transformer* is any function that accepts a single value and returns a single value. If the *transformer*'s
 * return value has any type other than `boolean`, the return value is used as the result of the transformer. If the
 * *transformer* returns a value of type `boolean`, the return value indicates whether the input value should be
 * included or excluded by the transformation.
 * 
 * @func transformation
 * @param  {function[]} transformers One or more transform functions or a single transformaton function.
 * @returns {function}
 */
module.exports = function transformation(transformers) {

    if( istransformation(transformers) ) return transformers;

    notarray(transformers) && fail(ERR_BAD_TRANSFORMERS, typeorclass(transformers));

    transformers.forEach( transformervalidatorfactory() );

    return function _functionish_transformation(value) {
        return applytransformers(transformers, value);
    }
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

    return transformation => void(
        notfunction(transformation) && fail(ERR_BAD_TRANSFORMER, index, typeorclass(transformation)),
        index += 1
    )
}