/**
 * @module lists/transformer
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TYPE_BOOLEAN = 'boolean';

const id = require('../id');

const transformreducer = (transformer, transformation) => value => _transform(transformer, transformation, value);

function transformer(...transformations) {
    return transformations.reduceRight(transformreducer, id);
}

function _transform(transformer, transformation, value) {

    const result = transformation(value);

    return (typeof result !== TYPE_BOOLEAN) ? transformer(result)
         : result ? transformer(value)
         : TRANSFORM_REJECT;
}

module.exports = transformer;