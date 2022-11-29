/**
 * @module transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_REDUCER = `TransduceError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATIONS = `TransduceError~The transformations argument has type %s. Expected an array of functions.`;

const curry4 = require('../curry4');
const fail = require("../fail");
const notarray = require('../notarray');
const notfunction = require("../notfunction");
const notiterable = require('../notiterable');
const reduce = require('../reduce');
const transducer = require('./transducer');
const typeorclass = require("../typeorclass");

module.exports = curry4(transduce);

function transduce(transformations, reducer, initialvalue, list) {

    notarray(transformations) && fail(ERR_BAD_TRANSFORMATIONS, typeorclass(transformations));
    notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));
    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    const transformreducer = transducer(...transformations)(reducer);

    return reduce(transformreducer, initialvalue, list);
}