/**
 * @module transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMER = `TransformError~The transformer has type %s. Expected a function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMER_NAME = '_transformer_';

const curry2 = require('../curry2');
const fail = require('../fail');
const isarray = require("../isarray");
const isfunction = require("../isfunction");
const isiterable = require('../isiterable');
const _transformer = require('./transformer');
const typeorclass = require('./typeorclass');

const istransformer = func => isfunction(func) && (func.name === TRANSFORMER_NAME);

module.exports = curry2(

    function transform(transformer, list) {

        transformer = validatetransformer(transformer);

        return isarray(list) ? transformarray(transformer, list)
             : isiterable(list) ? transformiterable(transformer, list)
             : fail(ERR_BAD_LIST, typeorclass(list));

    }
    
)

function transformarray(transformer, array){

    const arrayreducer = arrayreducerfactory(transformer);

    return array.reduce(arrayreducer, []);
}

function transformiterable(transformer, iterable) {

    return {
        [Symbol.iterator]: function* () {

            for(const value of iterable) {

                const transformedvalue = transformer(value);

                if(transformedvalue !== TRANSFORM_REJECT) yield transformedvalue;
            }
        }
    }
}

function arrayreducerfactory(transformer) {
    
    return function arrayreducer(array, nextvalue) {
        
        const transformedvalue = transformer(nextvalue);
        
        if(transformedvalue !== TRANSFORM_REJECT) array.push(transformedvalue);
        
        return array;
    }
}

function validatetransformer(transformer) {

    return istransformer(transformer) ? transformer
         : isfunction(transformer) ? _transformer(transformer)
         : isarray(transformer) ? _transformer(...transformer)
         : fail(ERR_BAD_TRANSFORMER, typeorclass(transformer));
}