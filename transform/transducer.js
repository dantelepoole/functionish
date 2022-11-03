/**
 * @module transform/transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation_';

const fail = require('../fail');
const notarray = require('../notarray');
const notfunction = require('../notfunction');
const typeorclass = require('./typeorclass');

const istransformsuccess = transformationresult => (transformationresult !== TRANSFORM_REJECT);
const nottransformation = func => notfunction(func) || (func.name !== TRANSFORMATION_NAME);

module.exports = function transducer(transformation) {

    nottransformation(transformation) && (transformation = constructtransformation(transformation));

    return function _functionish_transducer_(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return (currentvalue, nextvalue) => transducevalue(transformation, reducer, currentvalue, nextvalue);
    }
}

function transducevalue(transformation, reducer, currentvalue, nextvalue) {

    const transformedvalue = transformation(nextvalue);

    return istransformsuccess(transformedvalue) ? reducer(currentvalue, transformedvalue)
                                                : currentvalue;
}

function constructtransformation(transformation) {

    notarray(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));

    return _transformation(...transformation);
}