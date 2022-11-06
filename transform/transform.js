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

/**
 * Return a function that applies the argument *transformation* to each value produced by the iterable *list* and
 * returns an iterable object producing the transformed values.
 * 
 * The *transformation* argument may either be the function returned by
 * {@link module:transform/transformation transformation()} or an array of transformer functions. See
 * {@link module:transform/transformation transformation()}for more information on transformer functions.
 * 
 * `transform()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const transform = require('functionish/transform');
 * const transformation = require('functionish/transformation');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * 
 * const xformation = transformation(iseven, double);
 * 
 * const numbers = [1,2,3,4,5];
 * const transformednumbers = transform(xformation, numbers);
 * 
 * Array.from( transformednumbers ); // returns [4,8]
 * 
 * @func transform
 * @see {@link module:transform/transformation transformation()}
 * @param {(function|function[])} transformation The transformation or array of transformers to apply
 * @param {iterable} list An iterable object producing the values to transform
 * @returns {iterable} An iterable object producing the transformed values
 */
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