/**
 * @module repeat
 */

'use strict';

const ERROR_BAD_COUNT = `functionish/repeat(): The count argument is %s. Expected a positive integer number.`;
const ERROR_BAD_COUNT_TYPE = `functionish/repeat(): The count argument has type %s. Expected a positive integer number.`;

const format = require('./misc/format');
const partial = require('./partial');
const raise = require('./errors/raise');

const isinteger = Number.isSafeInteger;
const isnumber = x => (typeof x === 'number');
const ispositiveinteger = x => isinteger(x) && (x >= 0);

const badcountmessage = partial(format, ERROR_BAD_COUNT);
const raisebadcounterror = count => raise( new TypeError( badcountmessage(count) ) );

const badcounttypemessage = partial(format, ERROR_BAD_COUNT_TYPE);
const raisebadcounttypeerror = counttype => raise( new TypeError( badcounttypemessage(counttype) ) );

const validatecount = count => ispositiveinteger(count)
                               || (isnumber(count) && raisebadcounterror(count))
                               || raisebadcounttypeerror(typeof count);

/**
 * Invoke *targetfunc* *count* number of times and return the return value of the final call or `undefined` if
 * *targetfunc* is never called.
 * 
 * @example <caption>Example usage of `repeat()`</caption>
 * 
 * const { repeat } = require('functionish');
 * 
 * repeat(3, console.log, 'foobar'); // prints 'foobar' to the screen three times in a row
 * 
 * @function repeat
 * @param {number} count The number of times to call *targetfunc*
 * @param {function} targetfunc The function to invoke
 * @param {...any} args The arguments to pass to *targetfunc*
 * @returns {any} The final call's return value
 */
function repeat(count, targetfunc, ...args) {

    validatecount(count);

    let result = undefined;

    while(count > 0) {
        result = targetfunc(...args);
        count -= 1;
    }

    return result;
}

module.exports = repeat;