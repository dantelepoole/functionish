/**
 * @module transducer
 */

'use strict';

const CONTEXT_NONE = null;
const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;

const TRANSFORM_REJECT = false;

const fail = require('./fail');
const notfunction = require('./notfunction');
const transformation = require('./transformation');
const typeorclass = require('./typeorclass');

const buildtransformation = transformation;

/**
 * Return a function that accepts a reducer function and returns a new reducer function that applies the 
 * *transformer* functions in order to each value passed to the reducer.
 * 
 * A *transformer* is any function that accepts a single value and returns a single value. If the *transformer*'s
 * return value has any type other than `boolean`, the return value is used as the result of the transformer. If the
 * *transformer* returns a value of type `boolean`, the return value indicates whether the input value should be
 * included or excluded by the transformation.
 * 
 * A reducer function is any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}.
 * 
 * @example
 * 
 * const transducer = require('functionish/transducer');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * const sum = (a,b) => (a+b);
 * 
 * const doubleiseventransducer = transducer(iseven, double);
 * 
 * const numbers = [1,2,3,4,5];
 * const sumreducer = doubleiseventransducer(sum);
 * const result = numbers.reduce( sumreducer, 0 );
 * 
 * console.log(result); // prints '12'
 * 
 * @func transducer
 * @param {...function} transformers One or more transform functions to apply or a single transformation function.
 * @returns {function} A transducer function
 */
module.exports = function transducer(...transformers) {

    const transformation = buildtransformation(transformers);

    return function _functionish_transducer_(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return transformingreducer.bind(CONTEXT_NONE, transformation, reducer);
    }
}

function transformingreducer(transformation, reducer, currentvalue, nextvalue) {

    const transformresult = transformation(nextvalue);

    if(transformresult !== TRANSFORM_REJECT) currentvalue = reducer(currentvalue, transformresult);

    return currentvalue;
}