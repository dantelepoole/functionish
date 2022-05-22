/**
 * @module range
 */

'use strict';

/**
 * Return an iterable that generates the integers from 1 to *count* (inclusive). If *count* is negative or not a number,
 * the returned iterable produces nothing.
 * 
 * @func range
 * @param {number} count The maximum number to generate
 * @returns {iterable}
 */
module.exports = function* range(count) {

    let counter = 1;

    while( counter <= count ) {
        yield counter;
        counter += 1;
    }
}