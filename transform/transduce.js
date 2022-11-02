/**
 * @module transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransduceError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORMATION_NAME = '_functionish_transformation_';

const curry4 = require('../curry4');
const fail = require('../fail');
const isarray = require('../isarray');
const isfunction = require('../isfunction');
const isiterable = require('../isiterable');
const transducer = require('./transducer');
const typeorclass = require('./typeorclass');

const istransformation = func => isfunction(func) && (func.name === TRANSFORMATION_NAME);

module.exports = curry4(

    function transduce(transformation, reducer, initialvalue, list) {

        transformation = validatetransformation(transformation);

        const transformreducer = transducer(transformation)(reducer);

        return isarray(list) ? list.reduce(transformreducer, initialvalue)
             : isiterable(list) ? reduceiterable(transformreducer, initialvalue, list)
             : fail(ERR_BAD_LIST, typeorclass(list));
    }
)

function reduceiterable(reducer, initialvalue, iterable) {

    let accumulator = initialvalue;

    for(const nextvalue of iterable) accumulator = reducer(accumulator, nextvalue);

    return accumulator;
}

function validatetransformation(transformation) {

    return istransformation(transformation) ? transformation
         : isarray(transformation) ? _transformation(...transformation)
         : isfunction(transformation) ? _transformation(transformation)
         : fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
}