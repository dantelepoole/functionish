/**
 * @module range
 */

'use strict';

const STEP_DECREMENT = -1;
const STEP_INCREMENT = 1;

const EMPTY_ITERABLE = Object.freeze( { [Symbol.iterator] : function* () {} } );

const ERR_BAD_RANGE = `RangeError~The range %s %s. Expected an integer number.`;
const ERR_BAD_RANGECOUNT = `RangeError~The range count %s. Expected a positive integer number.`;

const fail = require('./fail');
const isequal = require('./isequal');
const isgreaterthan = require('./isgreaterthan');
const notinteger = require('./notinteger');
const typeorclass = require('./typeorclass');

const isnumberornan = x => (typeof x === 'number');
const iszero = isequal(0);
const notpositiveinteger = x => notinteger(x) || (x < 0);


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

    if(arguments.length > 1) validaterange(start, end);
    else {
    
        if( iszero(start) ) return EMPTY_ITERABLE;

        notpositiveinteger(start) && fail(ERR_BAD_RANGECOUNT, getrangeissue(start));
        
        [start, end] = [1, start];
    }

    const increment = isgreaterthan(end, start) ?  STEP_DECREMENT : STEP_INCREMENT;
    end += increment;

    return {
        [Symbol.iterator] : function* () {
            for( let counter = start; counter !== end; counter += increment ) yield counter;
        }

    }
}

function getrangeissue(range) {
    return isnumberornan(range) ? `is ${range}` : `has type ${typeorclass(range)}`;
}

function validaterange(start, end) {

    notinteger(start) && fail(ERR_BAD_RANGE, 'start', getrangeissue(start));
    notinteger(end) && fail(ERR_BAD_RANGE, 'end', getrangeissue(end));
}