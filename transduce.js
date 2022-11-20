/**
 * @module transduce
 */

'use strict';

const ERR_BAD_LIST = `TransduceError~The list has type %s. Expected an iterable object.`;
const ERR_BAD_REDUCER = `TransduceError~The reducer has type %s. Expected a function.`;

const TRANSFORM_REJECT = Symbol.for('functionish/transform/TRANSFORM_REJECT');

const buildtransformation = require('./transformation');
const curry4 = require('./curry4');
const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Convenience function that transduces the iterable *list* argument by applying the *transfomers* functions in order 
 * to each value produced by *list* before reducing the value with the *reducer* argument.
 * 
 * If the transduction is to be repeated, it will generally be more performant to first create a *transducer* yourself
 * and then pass it {@link module:reduce reduce()} yourself.
 * 
 * A *transformer* is any function that accepts a single value and returns a single value. If the *transformer*'s
 * return value has any type other than `boolean`, the return value is used as the result of the transformer. If the
 * *transformer* returns a value of type `boolean`, the return value indicates whether the input value should be
 * included or excluded by the transformation.
 * 
 * A reducer function is any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}.
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
 * @see {@link module:transducer transducer()}
 * @param {(function|function[])} transformers An array of transform functions or a single transformation function to apply
 * @param {function} reducer Any function accepted by {@link external:Array.prototype.reduce() Array.reduce()}
 * @param {any} initialvalue The initial value to use for reducing the *list*
 * @param {iterable} iterable An iterable object producing the values to transduce
 * @returns {function} The transduced value
 */
module.exports = curry4(

    function transduce(transformers, reducer, initialvalue, list) {
        
        notfunction(reducer) && fail(ERR_BAD_REDUCER, typeorclass(reducer));
        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        const transformation = buildtransformation(transformers);

        let currentvalue = initialvalue;

        for(const nextvalue of list) {

            const transformresult = transformation(nextvalue);
            
            if(transformresult !== TRANSFORM_REJECT) currentvalue = reducer(currentvalue, transformresult);
        }

        return currentvalue;
    }
)