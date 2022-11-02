/**
 * @module transform/transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransformError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation_';

const curry2 = require('../curry2');
const fail = require('../fail');
const isarray = require("../isarray");
const isfunction = require("../isfunction");
const isiterable = require('../isiterable');
const _transformation = require('./transformation');
const typeorclass = require('./typeorclass');

const istransformation = func => isfunction(func) && (func.name === TRANSFORMATION_NAME);
const notrejected = transformationresult => (transformationresult !== TRANSFORM_REJECT);

module.exports = curry2(

    function transform(transformation, list) {

        transformation = validatetransformation(transformation);

        return isarray(list) ? transformarray(transformation, list)
             : isiterable(list) ? transformiterable(transformation, list)
             : fail(ERR_BAD_LIST, typeorclass(list));

    }
    
)

function transformarray(transformation, array){

    const results = [];

    for(let index = 0; index < array.length; index += 1) {

        const transformationresult = transformation(array[index]);

        notrejected(transformationresult) && results.push(transformationresult);
    }

    return results;
}

function transformiterable(transformation, iterable) {

    return {
        [Symbol.iterator]: function* () {

            for(const value of iterable) {

                const transformationresult = transformation(value);

                if( notrejected(transformationresult) ) yield transformationresult;
            }
        }
    }
}

function validatetransformation(transformation) {

    return istransformation(transformation) ? transformation
         : isarray(transformation) ? _transformation(...transformation)
         : isfunction(transformation) ? _transformation(transformation)
         : fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
}