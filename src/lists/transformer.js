/**
 * @module lists/transformer
 */

'use strict';

const CONTEXT_NONE = undefined;
const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const id = require('../id');
const notboolean = require('../types/notboolean');

const transformreducer = (transform, transformation) => _transform.bind(CONTEXT_NONE, transform, transformation);

function transformer(...transformations) {
    return transformations.reduceRight(transformreducer, id)
}

function _transform(transform, transformation, value) {

    const result = transformation(value);

    return notboolean(result) ? transform(result)
         : result ? transform(value)
         : TRANSFORM_REJECT;
}

module.exports = transformer;