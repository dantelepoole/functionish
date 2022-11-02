/**
 * @module transformer
 */

'use strict';

const ERR_BAD_TRANSFORMATION = `TransformerError~The transformation at index %i has type %s. Expected a function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const fail = require('../fail');
const map = require('../map');
const notboolean = require('../notboolean');
const notfunction = require('../notfunction');
const typeorclass = require('./typeorclass');

module.exports = function transformer(...transformations) {

    transformations = map(transformationvalidatorfactory(), transformations);

    return function _transformer_(value) {

        for(const transformation of transformations) {
            
            value = transform(transformation, value);

            if(value === TRANSFORM_REJECT) break;
        }

        return value;
    }
}

function transform(transformation, value) {

    const result = transformation(value);

    return notboolean(result) ? result
         : result ? value
         : TRANSFORM_REJECT;
}

function transformationvalidatorfactory() {

    let index = 0; 

    return function transformationvalidator(transformation) {
        
        notfunction(transformation) && fail(ERR_BAD_TRANSFORMATION, index, typeorclass(transformation));

        index += 1;

        return transformation;
    }
}