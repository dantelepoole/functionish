/**
 * @module transformation
 */

'use strict';

const ERR_BAD_TRANSFORMER = `TransformationError~The transformer at index %i has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMERS = `TransformationError~The transformers argument has type %s. Expected an array of functions or a single function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;
const TRANSFORM_REJECT = false;
const TRANSFORMATION_NAME = '_functionish_transformation';

const fail = require('./fail');
const isarray = require('./isarray');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const istransformation = transformation => (transformation.name === TRANSFORMATION_NAME);

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
 * @param  {(function|function[])} transformers One or more transformer functions.
 * @returns {function}
 */
module.exports = function transformation(transformers) {

    return isarray(transformers) ? compoundtransformation( transformers.slice() )
         : notfunction(transformers) ? fail(ERR_BAD_TRANSFORMERS, typeorclass(transformers))
         : istransformation(transformers) ? transformers
         : simpletransformation(transformers);
}

function compoundtransformation(transformers) {

    validatetransformers(transformers);

    const transformercount = transformers.length;

    return function _functionish_transformation(value) {

        let index = 0;
        
        while(index < transformercount) {

            const transformresult = transformers[index](value);

            index += 1;
            
            if(transformresult === FILTER_INCLUDE) continue;
            
            if(transformresult === FILTER_REJECT) return TRANSFORM_REJECT;
            
            value = transformresult;
        }

        return value;
    }
}

function simpletransformation(transformer) {

    return function _functionish_transformation(value) {
        
        const transformresult = transformer(value);
        
        return (transformresult === FILTER_INCLUDE) ? value : transformresult;
    }
}

function validatetransformers(transformers) {
    transformers.forEach( transformervalidatorfactory() );
}

function transformervalidatorfactory() {

    let index = 0; 

    return transformation => void(
        notfunction(transformation) && fail(ERR_BAD_TRANSFORMER, index, typeorclass(transformation)),
        index += 1
    )
}