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
const notiterable = require('../notiterable');
const _transformation = require('./transformation');
const typeorclass = require('./typeorclass');

const istransformation = func => isfunction(func) && (func.name === TRANSFORMATION_NAME);
const notrejected = transformationresult => (transformationresult !== TRANSFORM_REJECT);

module.exports = curry2(

    function transform(transformation, list) {

        transformation = validatetransformation(transformation);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator]: function* () {
    
                for(const value of list) {
    
                    const transformationresult = transformation(value);
    
                    if( notrejected(transformationresult) ) yield transformationresult;
                }
            }
        }

    }
    
)

function validatetransformation(transformation) {

    return istransformation(transformation) ? transformation
         : isarray(transformation) ? _transformation(...transformation)
         : isfunction(transformation) ? _transformation(transformation)
         : fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));
}