/**
 * @module transform/transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransduceError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORMATION_NAME = '_functionish_transformation_';

const curry4 = require('../curry4');
const fail = require('../fail');
const notarray = require('../notarray');
const notiterable = require('../notiterable');
const transducer = require('./transducer');
const typeorclass = require('./typeorclass');

const nottransformation = func => notfunction(func) || (func.name !== TRANSFORMATION_NAME);

module.exports = curry4(

    function transduce(transformation, reducer, initialvalue, list) {

        nottransformation(transformation) && (transformation = constructtransformation(transformation));

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        const transformreducer = transducer(transformation)(reducer);

        let currentvalue = initialvalue;

        for(const nextvalue of list) currentvalue = transformreducer(currentvalue, nextvalue);

        return currentvalue;
    }
)

function constructtransformation(transformation) {

    notarray(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));

    return _transformation(...transformation);
}