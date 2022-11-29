/**
 * @module transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation has type %s. Expected a function.`;
const FILTER_INCLUDE = true;
const FILTER_REJECT = false;

const fail = require("./fail");
const map = require('./map');
const notfunction = require("./notfunction");
const partial = require('./partial');
const typeorclass = require("./typeorclass");

const validatetransformations = map(
    transformation => notfunction(transformation) 
                       &&
                      fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation))
)

module.exports = function transducer(...transformations) {

    validatetransformations(transformations);

    if(transformations.length === 1) return simpletransducerfactory(transformations[0]);

    return function functionish_transducer(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return partial(functionish_reducer, transformations, reducer);
    }
}

function simpletransducerfactory(transformation) {

    return function functionish_transducer(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return partial(functionish_reducer_simple, transformation, reducer);
    }
}

function functionish_reducer_simple(transformation, reducer, currentvalue, nextvalue) {

    const result = transformation(nextvalue);

    return (result === FILTER_REJECT) ? currentvalue
         : (result === FILTER_INCLUDE) ? reducer(currentvalue, nextvalue)
         : reducer(currentvalue, result);
}

function functionish_reducer(transformations, reducer, currentvalue, nextvalue) {

    let index = 0;

    while(index < transformations.length) {

        const result = transformations[index](nextvalue);

        if(result === FILTER_REJECT) return currentvalue;

        if(result !== FILTER_INCLUDE) nextvalue = result;

        index += 1;
    }

    return reducer(currentvalue, nextvalue);
}