/**
 * @module transform/transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation_';

const fail = require('../fail');
const isfunction = require('../isfunction');
const notfunction = require('../notfunction');
const typeorclass = require('./typeorclass');

const istransformation = func => isfunction(func) && (func.name === TRANSFORMATION_NAME);
const isrejected = transformationresult => (transformationresult === TRANSFORM_REJECT);

module.exports = function transducer(transformation) {

    transformation = validatetransformation(transformation);

    return function _functionish_transducer_(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return (currentvalue, nextvalue) => transducevalue(transformation, reducer, currentvalue, nextvalue);
    }
}

function transducevalue(transformation, reducer, currentvalue, nextvalue) {

    const transformationresult = transformation(nextvalue);

    return isrejected(transformationresult) ? currentvalue : reducer(currentvalue, transformationresult);
}

function validatetransformation(transformation) {

    return istransformation(transformation) ? transformation
         : isarray(transformation) ? _transformation(...transformation)
         : isfunction(transformation) ? _transformation(transformation)
         : fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
}