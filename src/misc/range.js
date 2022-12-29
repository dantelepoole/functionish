/**
 * @module misc/range
 */

'use strict';

const EMPTY_ITERABLE = { [Symbol.iterator]: function* () {} };

const STEP_DECREMENT = -1;
const STEP_INCREMENT = 1;

const ERR_BAD_RANGE = `RangeError~The range %s %s. Expected an integer number.`;
const ERR_BAD_COUNT = `RangeError~The count %s. Expected a positive integer.`;

const fail = require('./fail');
const isinteger = require('./isinteger');
const typeorclass = require('../typeorclass');

const isnumberornan = x => (typeof x === 'number');
const ispositiveinteger = x => isinteger(x) && (x >= 0);

/**
 * If passed a single argument, return an iterable that produces the number 1 through the specified number. If the
 * specified number is `0`, the iterable will be empty. The argument must be a positive integer.
 * 
 * If passed two arguments, return an iterable that produces the numbers starting from the first argument to the
 * second argument (both inclusive). Both arguments must be integers, but don't have to be positive. If *end* is
 * less than *start*, the iterable will begin at *end* and count down. Otherwise, it begins at *start* and counts
 * up.
 * 
 * @example
 * 
 * const range = require('./range')
 * 
 * Array.from( range(5) ); // returns [1,2,3,4,5]
 * Array.from( range(1) ); // returns [1]
 * Array.from( range(0) ); // returns []
 * 
 * Array.from( range(1,5) ); // returns [1,2,3,4,5]
 * Array.from( range(5,1) ); // returns [5,4,3,2,1]
 * 
 * Array.from( range(-1,-5) ); // returns [-1,-2,-3,-4,-5]
 * Array.from( range(-5,-1) ); // returns [-5,-4,-3,-2,-1]
 * 
 * @func range
 * @param {number} start The first number that the iterable should produce, or the maximum number to produce
 *                       *end* is ommitted
 * @param {number} end The last number that the iterable should produce
 * @returns {iterable}
 */
 module.exports = function range(start, end) {

    (arguments.length === 1) ? ([start, end] = rangefromcount(start))
                             : validaterange(start, end);

    if(start === end) return EMPTY_ITERABLE;

    const increment = (start > end) ?  STEP_DECREMENT : STEP_INCREMENT;

    return {
        [Symbol.iterator]: function* () {
            
            let counter = start;
            const maxcount = (end + increment);

            while(counter !== maxcount) {
                yield counter;
                counter += increment;
            }
        }
    }
}

function numericvaluemessage(x) {
    return isnumberornan(x) ? `is ${x}` : `has type ${typeorclass(x)}`;
}

function validaterange(start, end) {

    isinteger(start) || fail(ERR_BAD_RANGE, 'start', numericvaluemessage(start));
    isinteger(end) || fail(ERR_BAD_RANGE, 'end', numericvaluemessage(end));
}

function validatecount(count) {
    ispositiveinteger(count) || fail(ERR_BAD_COUNT, numericvaluemessage(count));
}

function rangefromcount(count) {

    validatecount(count);

    return (count > 0) ? [1, count]
         : (count < 0) ? [-1, count]
         : [1, 1];
}