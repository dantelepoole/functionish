/**
 * @module transduce
 */

'use strict';

const ERR_BAD_TRANSFORMATIONS = `TransduceError~The transformations argument has type %s. Expected an array of functions.`;

const curry4 = require('./curry4');
const fail = require("./fail");
const notarray = require('./notarray');
const reduce = require('./reduce');
const transducer = require('./transducer');
const typeorclass = require("./typeorclass");

module.exports = curry4(transduce);

function transduce(transformations, reducer, initialvalue, list) {

    notarray(transformations) && fail(ERR_BAD_TRANSFORMATIONS, typeorclass(transformations));

    const transformreducer = transducer(...transformations)(reducer);

    return reduce(transformreducer, initialvalue, list);
}