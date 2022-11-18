/**
 * @module transformation
 */

'use strict';

const ERR_BAD_TRANSFORMER = `TransformationError~The transformer at index %i has type %s. Expected a function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const fail = require('./fail');
const iterate = require('./iterate');
const notboolean = require('./notboolean');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const validatetransformers = transformers => iterate( transformervalidatorfactory(), transformers );

/**
 * Return a transformation function that accepts a single value, applies each *transformer* function to that value in
 * order and returns the result. The returned function is suitable to be passed to
 * {@link module:transform transform()}, {@link module:transduce transduce()} or
 * {@link module:transducer transducer()}. It is *not* appropriate for direct use in user code, in which case
 * it would produce incorrect results.
 * 
 * A *transformer* is any function that accepts a single value and returns a single value. If the *transformer*'s
 * return value has any type other than `boolean`, the return value is used as the result of the transformer. If the
 * *transformer* returns a value of type `boolean`, the return value indicates whether the input value should be
 * included or excluded by the transformation.
 * 
 * @func transformation
 * @see {@link module:transform transform()}
 * @see {@link module:transduce transduce()}
 * @see {@link module:transducer transducer()}
 * @param  {...function} transformers 
 * @returns {function}
 */
module.exports = function transformation(...transformers) {

    validatetransformers(transformers);

    return function _functionish_transformation_(value) {
        return applytransformers(transformers, value);
    }
}

function applytransformers(transformers, value) {

    for(let index = 0; index < transformers.length; index += 1) {

        const transformerresult = transformers[index](value);

        value = notboolean(transformerresult) ? transformerresult
              : transformerresult ? value
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