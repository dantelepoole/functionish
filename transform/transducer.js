/**
 * @module transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMER = `TransducerError~The transformer has type %s. Expected a function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMER_NAME = '_transformer_';

const curry2 = require('../curry2');
const fail = require('../fail');
const isarray = require("../isarray");
const isfunction = require("../isfunction");
const notfunction = require('../notfunction');
const _transformer = require('./transformer');
const typeorclass = require('./typeorclass');

const istransformer = func => isfunction(func) && (func.name === TRANSFORMER_NAME);

module.exports = curry2(

    function transducer(transformer, reducer) {

        transformer = validatetransformer(transformer);
        
        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return function _transducereducer_(currentvalue, nextvalue) {

            nextvalue = transformer(nextvalue);

            return (nextvalue === TRANSFORM_REJECT) ? currentvalue : reducer(currentvalue, nextvalue);
        }

    }
    
)

function validatetransformer(transformer) {

    return istransformer(transformer) ? transformer
         : isfunction(transformer) ? _transformer(transformer)
         : isarray(transformer) ? _transformer(...transformer)
         : fail(ERR_BAD_TRANSFORMER, typeorclass(transformer));
}