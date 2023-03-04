/**
 * @module lists/transformer
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const id = require('../id');
const isfunction = require('../types/isfunction');
const notboolean = require('../types/notboolean');
const partial = require('../partial');

function transformer(...transformations) {

    const transformation = transformations.reduceRight(transformationreducer, id);

    return partial(_transform, transformation);
}

function _transform(transformation, source) {

    return isfunction(source)
         ? transducer(transformation, source)
         : listtransformer(transformation, source);
}

function listtransformer(transformation, list) {

    return {

        [Symbol.iterator] : function* () {

            for(const value of list) {

                const result = transformation(value);

                if(result !== TRANSFORM_REJECT) yield result;
            }
        }
    }
}

function transducer(transformation, reducer) {

    return function _transformreducer(current, nextvalue) {

        nextvalue = transformation(nextvalue);

        return (nextvalue === TRANSFORM_REJECT)
             ? current
             : reducer(current, nextvalue);
    }
}

function transformationreducer(transformation, func) {

    return function transformvalue(value) {

        const result = func(value);

        return notboolean(result) ? transformation(result)
             : result ? transformation(value)
             : TRANSFORM_REJECT;
    }
}

module.exports = transformer;