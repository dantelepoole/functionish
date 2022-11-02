/**
 * @module transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation at index %i has type %s. Expected a function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const fail = require('../fail');
const isfunction = require('../isfunction');
const map = require('../map');
const notboolean = require('../notboolean');
const notfunction = require('../notfunction');
const typeorclass = require('./typeorclass');

const transducerreducer = (reducer, transducer) => transducer(reducer);

module.exports = function transducer(...transformations) {

    const transducers = map(transformationtransducerfactory(), transformations);

    return reducer => isfunction(reducer) ? transducers.reduceRight(transducerreducer, reducer)
                                          : fail(ERR_BAD_REDUCER, typeorclass(reducer));
}

function transformationtransducerfactory() {

    let index = 0; 

    return function transformationtransducer(transformation) {
        
        notfunction(transformation) && fail(ERR_BAD_TRANSFORMATION, index, typeorclass(transformation));

        index += 1;

        return createtransformationtransducer(transformation);
    }
}

function createtransformationtransducer(transformation) {

    return function transformationtransducer(reducer) {

        return function transformationreducer(currentvalue, nextvalue) {

            const transformationresult = transformation(nextvalue);

            return notboolean(transformationresult) ? reducer(currentvalue, transformationresult)
                 : transformationresult ? reducer(currentvalue, nextvalue)
                 : currentvalue;
        }
    }
}