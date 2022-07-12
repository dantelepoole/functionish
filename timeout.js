/**
 * @module timeout
 */

'use strict';

const ERR_BAD_DELAY = `TimeoutError~The delay %s. Expected a positive integer.`;
const ERR_BAD_FUNCTION = `TimeoutError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const isinteger = require('./isinteger');
const typeorclass = require('./typeorclass');

/**
 * Call *func* with the specified *args* after at least *delay* milliseconds have passed and return a function that
 * cancels the pending timeout.
 * 
 * @func timeout
 * @see {@link external:setTimeout setTimeout()}
 * @param {integer} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @param  {...any} args The arguments to pass to *func*
 * @returns {function} A function to clear the pending timeout
 */
module.exports = function timeout(delayms, func, ...args) {

    checkdelay(delayms);

    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

    const timeoutid = setTimeout(func, delayms, ...args);

    return function canceltimeout() {
        clearTimeout(timeoutid);
    }
}

function checkdelay(delay) {

    if( isinteger(delay) && delay >= 0 ) return delay;

    const message = (typeof delay === 'number') ? `is ${delay}` : `has type ${typeof delay}`;
    fail(ERR_BAD_DELAY, message);
}