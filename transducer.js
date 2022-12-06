/**
 * @module transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation has type %s. Expected a function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

const fail = require("./fail");
const isempty = require('./isempty');
const issingular = require('./issingular');
const iterate = require('./iterate');
const notfunction = require("./notfunction");
const partial = require('./partial');
const typeorclass = require("./typeorclass");

const validatetransformation = transformation => notfunction(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
const validatetransformations = iterate(validatetransformation);

module.exports = function transducer(...transformations) {

    validatetransformations(transformations);

    return function functionish_transducer(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return isempty(transformations) ? reducer
             : issingular(transformations) ? partial(transform_reducer_simple, transformations[0], reducer)
             : partial(transform_reducer, transformations, reducer);
    }
}

function transform_reducer_simple(transformation, reducer, currentvalue, nextvalue) {

    const result = transformation(nextvalue);

    return (result === FILTER_REJECT) ? currentvalue
         : (result === FILTER_INCLUDE) ? reducer(currentvalue, nextvalue)
         : reducer(currentvalue, result);
}

function transform_reducer(transformations, reducer, currentvalue, nextvalue) {

    for(const transformation of transformations) {

        const result = transformation(nextvalue);

        if(result === FILTER_REJECT) return currentvalue;
        else if(result === FILTER_INCLUDE) continue;

        nextvalue = result;
    }

    return reducer(currentvalue, nextvalue);
}