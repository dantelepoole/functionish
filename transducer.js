/**
 * @module transducer
 */

'use strict';

const ERR_BAD_REDUCER = `TransducerError~The reducer has type %s. Expected a function.`;
const ERR_BAD_TRANSFORMATION = `TransducerError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');
const TRANSFORMATION_NAME = '_functionish_transformation_';

const fail = require('./fail');
const notarray = require('./notarray');
const notfunction = require('./notfunction');
const typeorclass = require('./typeorclass');

const istransformsuccess = transformationresult => (transformationresult !== TRANSFORM_REJECT);
const nottransformation = func => notfunction(func) || (func.name !== TRANSFORMATION_NAME);

/**
 * Return a function that accepts a reducer function and returns a new reducer function that applies the 
 * *transformation* function to each value pass to the reducer.
 * 
 * A reducer function is any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}.
 * 
 * The *transformation* argument may either be the function returned by
 * {@link module:transformation transformation()} or an array of transformer functions. See
 * {@link module:transformation transformation()}for more information on transformer functions.
 * 
 * @example
 * 
 * const transducer = require('functionish/transducer');
 * const transformation = require('functionish/transformation');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * const sum = (a,b) => (a+b);
 * 
 * const xformation = transformation(iseven, double);
 * const xducer = transducer(transformation); // or: transducer( [iseven, double] );
 * 
 * const numbers = [1,2,3,4,5];
 * const sumreducer = xducer(sum);
 * const result = numbers.reduce( sumreducer, 0 );
 * 
 * console.log(result); // prints '12'
 * 
 * @func transducer
 * @see {@link module:transformation transformation()}
 * @param {(function|function[])} transformation The transformation or array of transformers to apply
 * @returns {function} A transducer function
 */
module.exports = function transducer(transformation) {

    nottransformation(transformation) && (transformation = constructtransformation(transformation));

    return function _functionish_transducer_(reducer) {

        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));

        return (currentvalue, nextvalue) => transducevalue(transformation, reducer, currentvalue, nextvalue);
    }
}

function transducevalue(transformation, reducer, currentvalue, nextvalue) {

    const transformedvalue = transformation(nextvalue);

    return istransformsuccess(transformedvalue) ? reducer(currentvalue, transformedvalue)
                                                : currentvalue;
}

function constructtransformation(transformation) {

    notarray(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));

    return _transformation(...transformation);
}