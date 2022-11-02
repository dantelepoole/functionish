/**
 * @module transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;

const curry4 = require('../curry4');
const fail = require('../fail');
const isarray = require('../isarray');
const isiterable = require('../isiterable');
const transducer = require('./transducer');
const typeorclass = require('./typeorclass');

module.exports = curry4(

    function transduce(transformer, reducer, initialvalue, list) {

        const transducereducer = transducer(transformer, reducer);

        return isarray(list) ? list.reduce(reducer, initialvalue)
             : isiterable(list) ? transduceiterable(transducereducer, initialvalue, list)
             : fail(ERR_BAD_LIST, typeorclass(list));
    }
)

function transduceiterable(reducer, initialvalue, iterable) {

    let result = initialvalue;

    for(const nextvalue of iterable) result = reducer(result, nextvalue);

    return result;
}