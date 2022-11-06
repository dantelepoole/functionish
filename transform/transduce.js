/**
 * @module transform/transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_TRANSFORMATION = `TransduceError~The transformation has type %s. Expected a transformation function or an array of functions.`;

const TRANSFORMATION_NAME = '_functionish_transformation_';

const curry4 = require('../curry4');
const fail = require('../fail');
const notarray = require('../notarray');
const notiterable = require('../notiterable');
const transducer = require('./transducer');
const typeorclass = require('./typeorclass');

const nottransformation = func => notfunction(func) || (func.name !== TRANSFORMATION_NAME);

/**
 * Convenience function that transduces the iterable *list* argument by applying the *transformation* to each
 * value produced by *list* before reducing the value with the *reducer* argument.
 * 
 * If the transduction is to be repeated, it will generally be more performant to first create a *transducer* yourself
 * and then pass it {@link module:reduce reduce()} yourself.
 * 
 * A reducer function is any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}.
 * 
 * The *transformation* argument may either be the function returned by
 * {@link module:transform/transformation transformation()} or an array of transformer functions. See
 * {@link module:transform/transformation transformation()}for more information on transformer functions.
 * 
 * `transduce()` is curried by default with a quaternary arity (4).
 * 
 * @example
 * 
 * const transduce = require('functionish/transduce');
 * const transformation = require('functionish/transformation');
 * 
 * const double = x => (x*2);
 * const iseven = x => (x%2) === 0;
 * const sum = (a,b) => (a+b);
 * 
 * const xformation = transformation(iseven, double);
 * 
 * const numbers = [1,2,3,4,5];
 * const result = transduce(xformation, sum, 0, numbers);
 * 
 * console.log(result); // prints '12'
 * 
 * @func transduce
 * @see {@link module:transform/transformation transformation()}
 * @see {@link module:transform/transducer transducer()}
 * @param {(function|function[])} transformation The transformation or array of transformers to apply
 * @param {function} reducer Any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}
 * @param {any} initialvalue The initial value to use for reducing the *list*
 * @param {iterable} iterable An iterable object producing the values to transduce
 * @returns {function} The transduced value
 */
module.exports = curry4(

    function transduce(transformation, reducer, initialvalue, list) {

        nottransformation(transformation) && (transformation = constructtransformation(transformation));

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        const transformreducer = transducer(transformation)(reducer);

        let currentvalue = initialvalue;

        for(const nextvalue of list) currentvalue = transformreducer(currentvalue, nextvalue);

        return currentvalue;
    }
)

function constructtransformation(transformation) {

    notarray(transformation) && fail(ERR_BAD_TRANSFORMATION, typeorclass(transformation));

    return _transformation(...transformation);
}