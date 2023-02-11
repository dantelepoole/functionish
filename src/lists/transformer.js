/**
 * @module lists/transformer
 */

'use strict';

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const id = require('../id');
const isarray = require('../types/isarray');
const isfunction = require('../types/isfunction');
const notboolean = require('../types/notboolean');

const _transform = transformation => source => isfunction(source)
                                             ? transducer(transformation, source)
                                             : listtransformer(transformation, source);

function transformer(...transformations) {

    const transformation = transformations.reduceRight(transformationreducer, id);

    return _transform(transformation);
}

function listtransformer(transformation, list) {

    const transformedlist = transformingiterable(transformation, list);

    return isarray(list)
         ? Array.from(transformedlist)
         : transformedlist;
}

function transformingiterable(transformation, list) {

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

function transformationreducer(nexttransformation, transformation) {

    return function transformvalue(value) {

        const result = transformation(value);

        return notboolean(result) ? nexttransformation(result)
             : result ? nexttransformation(value)
             : TRANSFORM_REJECT;
    }
}

module.exports = transformer;