/**
 * @module transform
 */

'use strict';

const ERR_BAD_LIST = `TransformError~The list has type %s. Expected an iterable object.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation';

const curry2 = require('./curry2');
const fail = require('./fail');
const isfunction = require('./isfunction');
const notiterable = require('./notiterable');
const buildtransformation = require('./transformation');
const typeorclass = require('./typeorclass');

const istransformreject = transformresult => (transformresult === TRANSFORM_REJECT);

/**
 * Return a function that applies the *transformer* functions in order to each value produced by the iterable *list* and
 * returns an iterable object producing the transformed values.
 * 
 * A *transformer* is any function that accepts a single value and returns a single value. If the *transformer*'s
 * return value has any type other than `boolean`, the return value is used as the result of the transformer. If the
 * *transformer* returns a value of type `boolean`, the return value indicates whether the input value should be
 * included or excluded by the transformation.
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
 * @param {function[]} transformers An array of transform functions to apply
 * @param {iterable} list An iterable object producing the values to transform
 * @returns {iterable} An iterable object producing the transformed values
 */
module.exports = curry2(

    function transform(transformers, list) {

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        const transformation = buildtransformation(transformers);

        return {
            [Symbol.iterator]: function* () {
    
                for(const value of list) {
    
                    const transformresult = transformation(value);

                    if(transformresult !== TRANSFORM_REJECT) yield transformresult;
                }
            }
        }

    }
    
)