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
 * Invoke *func* *count* number of times, passing *args* at each invocation, and return the result of
 * the last invocation or `undefined` is *func* is never called.
 * 
 * @example <caption>Example usage of `repeat()`</caption>
 * 
 * const { repeat } = require('functionish');
 * 
 * repeat(3, console.log, 'foobar'); // prints 'foobar' to the screen three times in a row
 * 
 * @function repeat
 * @param {number} count The number of times to call *func*
 * @param {function} func The function to invoke
 * @param {...any} args The arguments to pass to *func*
 * @returns {any}
 */
function repeat(count, func, ...args) {

    validatecount(count);

    let result = undefined;

    for( /* noop */; count > 0; count -= 1 ) result = func(...args);

    return result;
}

module.exports = repeat;