/**
 * @module reduce
 */

'use strict';

const ERR_BAD_LIST = `ReduceError~The list has type %s. Expected an iterable object.`;

const binary = require('./binary');

const fail = require('./fail');
const isiterable = require('./isiterable');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Functional variant of {@link external:Array.prototype.reduce Array.prototype.reduce()}. Reduces the
 * values in *list* starting with the *initialvalue* and using the *reducer* function.
 * 
 * `reduce()` is curried by default with ternary arity.
 * 
 * @example
 * 
 * const reduce = require('functionish/reduce');
 * const range = require('functionish/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduce(sum, 0, [1,2,3]); // returns 6
 * reduce(sum, 0, range(3)); //returns 6
 * 
 * @func reduce
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, list) {

        reducer = resolvefunction(reducer);
        
        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        let currentvalue = initialvalue;

        for(const nextvalue of list) currentvalue = reducer(currentvalue, nextvalue);
    
        return currentvalue;
    }
)