/**
 * @module delay
 */

'use strict';

const ERR_BAD_DELAYMS = `functionish/delay(): The delayms argument is %s. Expected an integer of 0 or greater.`;
const ERR_BAD_TARGETFUNCTION = `functionish/delay(): The target function has type %. Expected a function.`;

const curry = require('./curry');
const defer = require('./defer');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const isnumberornan = require('./types/isnumberornan');
const typeorclassname = require('./types/typeorclassname');

/**
 * Call *targetfunc* with the specified *args* after at least *delay* milliseconds have passed and return a function
 * that cancels the delayed *targetfunc* invocation.
 * 
 * `delay()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `delay()`</caption>
 * 
 * const { delay } = require('functionish');
 * 
 * // print 'foobar' to the screen after at least 1 second
 * const canceldelayedfunc = delay(1000, console.log, 'foobar');
 * 
 * canceldelayedfunc(); // cancel the pending print operation
 * 
 * @function delay
 * @see {@link external:setTimeout setTimeout()}
 * @param {integer} delayms The number of milliseconds to delay the invocation of *targetfunc*
 * @param {function} targetfunc The function to invoke
 * @param  {...any} args The arguments to pass to *targetfunc*
 * @returns {function} A function to clear the pending delayed function
 */
function delay(delayms, targetfunc, ...args) {

    validatedelayms(delayms);
    validatetargetfunction(targetfunc);

    const deferredfunc = defer(targetfunc, ...args);
    const timeoutid = setTimeout(deferredfunc, delayms);
    
    return clearTimeout.bind(null, timeoutid);
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

function validatedelayms(delayms) {

    if(Number.isSafeInteger(delayms) && delayms >= 0) return delayms;

    const messagepart = isnumberornan(delayms)
                      ? String(delayms)
                      : typeorclassname(delayms);

    const errormessage = format(ERR_BAD_DELAYMS, messagepart);

    throw new TypeError(errormessage);
}

module.exports = curry(1, delay);