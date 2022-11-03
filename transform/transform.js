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
const notarray = require('../notarray');
const notfunction = require('../notfunction');
const notiterable = require('../notiterable');
const _transformation = require('./transformation');
const typeorclass = require('./typeorclass');

const istransformsuccess = transformationresult => (transformationresult !== TRANSFORM_REJECT);
const nottransformation = func => notfunction(func) || (func.name !== TRANSFORMATION_NAME);

module.exports = curry2(

    function transform(transformation, list) {

        nottransformation(transformation) && (transformation = constructtransformation(transformation));

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator]: function* () {
    
                for(const value of list) {
    
                    const transformedvalue = transformation(value);
    
                    if( istransformsuccess(transformedvalue) ) yield transformedvalue;
                }
            }
        }

    }
    
)

function constructtransformation(transformation) {

    notarray(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));

    return _transformation(...transformation);
}