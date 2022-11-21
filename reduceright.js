/**
 * @module reducericht
 */

'use strict';

const ERR_BAD_LIST = `ReduceRightError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const isarray = require('./isarray');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Functional variant of {@link external:Array.prototype.reduceRight Array.prototype.reduceRight()}. Reduces the
 * values in *list* in reverse order, starting with the *initialvalue* and using the *reducer* function.
 * 
 * `reduceRight()` is curried by default with ternary arity.
 * 
 * @example
 * 
 * const reduceright = require('functionish/reduceright');
 * const range = require('functionish/range');
 * 
 * function sum(a,b) { return (a+b) }
 * 
 * reduceright(sum, 0, [1,2,3]); // returns 6
 * reduceright(sum, 0, range(3)); //returns 6
 * 
 * @func reduceright
 * @param {function} reducer The reducer function
 * @param {any} initialvalue The initial value to pass to *reducer* as the accumulator
 * @param {iterable} list An iterable object
 * @returns {any} The reduced value
 */

module.exports = require('./curry3')(

    function reduce(reducer, initialvalue, list) {

        reducer = resolvefunction(reducer);
        
        const array = isarray(list) ? list 
                    : isiterable(list) ? Array.from(list)
                    : fail(ERR_BAD_LIST, typeorclass(list));

        return array.reduceRight(reducer, initialvalue);
    }
)