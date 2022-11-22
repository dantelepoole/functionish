/**
 * @module floor
 */

'use strict';

const ERR_BAD_NUMBER = `FloorError~The number has type %s. Expected a number.`;

const fail = require('./fail');
const isnan = require('./isnan');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

/**
 * Round the value of *number* rounded down to the largest integer less than or equal to *number*.
 * 
 * @func floor
 * @param {number} number The number to round down.
 * @returns {number}
 */
module.exports = function floor(number) {

    if( notnumber(number) ) {
        if( isnan(number) ) return NaN;
        fail(ERR_BAD_NUMBER, typeorclass(number));
    }

    return Math.floor(number);
}