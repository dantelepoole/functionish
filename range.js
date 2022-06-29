/**
 * @module range
 */

'use strict';

const STEP_DECREMENT = -1;
const STEP_INCREMENT = 1;

const ERR_BAD_RANGE = `RangeError~The range %s %s. Expected an integer number.`;
const ERR_BAD_RANGECOUNT = `RangeError~The range count %s. Expected a positive integer number.`;

const fail = require('./fail');
const notinteger = require('./notinteger');
const typeorclass = require('./typeorclass');

const notpositiveinteger = x => notinteger(x) || (x < 0);

/**
 * Return an iterable that generates the integers from 1 to *count* (inclusive). If *count* is negative or not a number,
 * the returned iterable produces nothing.
 * 
 * @func range
 * @param {number} count The maximum number to generate
 * @returns {iterable}
 */
 module.exports = function* range(start, end) {

    if( arguments.length === 1 ) {

        if(start === 0) return;
        
        if(notpositiveinteger(start)) fail(ERR_BAD_RANGECOUNT, rangeissue(start));
        
        [start, end] = [1, start];
    
    } else validaterange(start, end);

    const increment = (start <= end) ? STEP_INCREMENT : STEP_DECREMENT;
    end += increment;
    
    for( let counter = start; counter !== end; counter += increment ) yield counter;
}

function rangeissue(range) {
    return (typeof range === 'number') ? `is ${range}` : `has type ${typeorclass(range)}`;
}

function validaterange(start, end) {

    if( notinteger(start) ) fail(ERR_BAD_RANGE, 'start', rangeissue(start));
    else if( notinteger(end) ) fail(ERR_BAD_RANGE, 'end', rangeissue(end));
}