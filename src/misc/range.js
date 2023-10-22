/**
 * @module misc/range
 */

'use strict';

const ERRORMSG_BAD_RANGE = `functionish/misc/range(): The argument %s. Expected an integer number.`;

const EMPTY_ITERABLE = { [Symbol.iterator]: function* () {} };
const STEP_DECREMENT = -1;
const STEP_INCREMENT = 1;

const compose = require('../compose');
const error = require('../errors/error');
const isinteger = require('../types/isinteger');
const or = require('../logic/or');
const raise = require('../errors/raise');

const badrangeerror = error.Type(ERRORMSG_BAD_RANGE);
const buildbadrangeerror = count => (typeof count === 'number')
                                  ? badrangeerror(`is ${count}`)
                                  : badrangeerror(`has type ${typeof count}`);
const raisebadrange = compose(raise, buildbadrangeerror);
const validaterange = or(isinteger, raisebadrange);

/**
 * If passed a single argument, return an iterable that produces the number `1` through the specified integer (inclusive)
 * or `-1` through the specified integer (inclusive) if the argument is negative.If the argument is 0, an
 * empty iterable is returned.
 * 
 * If passed two arguments, return an iterable that produces the range of numbers starting at *start*
 * through *end* (both inclusive). Both arguments must be integers.
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

    return validaterange(start) && (arguments.length === 1) ? simplerange(start)
         : validaterange(end) && (start <= end) ? rangeiterable(start, end, STEP_INCREMENT)
         : rangeiterable(start, end, STEP_DECREMENT);
}

function rangeiterable(start, end, increment) {

    end += increment;

    return {

        [Symbol.iterator]: function* () {
            for(let i = start; i !== end; i += increment) yield i;
        }
    }
}

function simplerange(count) {

    return (count > 0) ? rangeiterable(1, count, 1)
         : (count < 0) ? rangeiterable(-1, count, -1)
         : EMPTY_ITERABLE;
}

module.exports = range;