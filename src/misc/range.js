/**
 * @module misc/range
 */

'use strict';

const EMPTY_ITERABLE = { [Symbol.iterator]: function* () {} };
const STEP_DECREMENT = -1;
const STEP_INCREMENT = 1;

const isvoid = require('../types/isvoid');

/**
 * If passed a single argument, return an iterable that produces the number `1` through the specified number (inclusive).
 * If the argument is less than `1`, an empty iterable is returned.
 * 
 * If passed two arguments, return an iterable that produces the range of numbers starting at *start*
 * through *end* (both inclusive). Both arguments must be integers, but don't have to be positive.
 * 
 * @example <caption>Example usage of `range()` with a single argument</caption>
 * 
 * const { range } = require('functionish/misc');
 * 
 * Array.from( range(5) ); // returns [1,2,3,4,5]
 * Array.from( range(1) ); // returns [1]
 * Array.from( range(0) ); // returns []
 * 
 * @example <caption>Example usage of `range()` with two arguments</caption>
 * 
 * Array.from( range(1,5) ); // returns [1,2,3,4,5]
 * Array.from( range(5,1) ); // returns [5,4,3,2,1]
 * 
 * Array.from( range(-1,-5) ); // returns [-1,-2,-3,-4,-5]
 * Array.from( range(-5,-1) ); // returns [-5,-4,-3,-2,-1]
 * 
 * @function range
 * @param {number} start The number to start the range at or, if it is the only argument, the
 *                       number to end the range at (inclusive).
 * @param {number} end The number to end the range at (inclusive).
 * @returns {iterable}
 */
function range(start, end) {

    return isvoid(end) ? simplerange(start)
         : (start <= end) ? rangeiterable(start, end, STEP_INCREMENT)
         : rangeiterable(start, end, STEP_DECREMENT);
}

function rangeiterable(start, end, increment) {

    const rangeend = (increment + end);

    return {

        [Symbol.iterator]: function* () {
            for(let counter = start; counter !== rangeend; counter += increment) yield counter;
        }
    }
}

function simplerange(count) {

    return (count > 0) ? rangeiterable(1, count, 1)
         : (count < 0) ? rangeiterable(-1, count, -1)
         : EMPTY_ITERABLE;
}

module.exports = range;