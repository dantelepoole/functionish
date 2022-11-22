/**
 * @module round
 */

'use strict';

const ERR_BAD_NUMBER = `RoundError~The number has type %s. Expected a number.`;

const fail = require('./fail');
const isnan = require('./isnan');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

/**
 * Round the value of *number* to the nearest integer.
 * 
 * @func round
 * @param {number} number The number to round to the nearest integer.
 * @returns {number}
 */
module.exports = function round(number) {

    if( notnumber(number) ) {
        if( isnan(number) ) return NaN;
        fail(ERR_BAD_NUMBER, typeorclass(number));
    }

    return Math.round(number);
}