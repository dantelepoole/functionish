/**
 * @module debounce
 */

'use strict';

const ERROR_DEBOUNCE_MODE = `Bad debounce mode '%s'. Expected 'leading' or 'trailing'.`;
const ERROR_DELAYMS = `Bad delayms '%s'. Expected a positive integer.`;
const MODE_LEADING = 'leading';
const MODE_TRAILING = 'trailing';
const TIMERID_IDLE = undefined;

const compose = require('./compose');
const curry = require('./curry');
const format = require('./misc/format');
const isinteger = Number.isSafeInteger;
const partial = require('./partial');
const raise = require('./raise');

const canceltimer = clearTimeout;
const starttimer = setTimeout;

const debouncemodeerror = partial(format, ERROR_DEBOUNCE_MODE);
const raisedebouncemodeerror = mode => raise( new TypeError( debouncemodeerror(mode) ) );
const validatedebouncemode = mode => (mode === MODE_LEADING) || (mode === MODE_TRAILING) || raisedebouncemodeerror(mode);

const delaymserror = partial(format, ERROR_DELAYMS);
const raisedelaymserror = delayms => raise( new TypeError( delaymserror(delayms) ) );
const validatedelayms = delayms => (isinteger(delayms) && (delayms > 0)) || raisedelaymserror(delayms);

/**
 * to do
 * 
 * @example <caption>Example usage of `curry()`</caption>
 * 
 * to do
 * 
 * @function debounce
 * @param {string} [mode='leading'] The debounce mode, either 'leading' or 'trailing'
 * @param {number} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} targetfunc The function to invoke
 * @returns {function}
 */
function debounce(mode=MODE_LEADING, delayms, targetfunc) {

    validatedebouncemode(mode);
    validatedelayms(delayms);

    const ismodeleading = (mode === MODE_LEADING);

    let timeoutid = TIMERID_IDLE;
    const istimeridle = () => (timeoutid === TIMERID_IDLE);
    const resettimeoutid = () => (timeoutid = TIMERID_IDLE);

    return function _debounce(...args) {

      if( ismodeleading && istimeridle() ) targetfunc.call(this, ...args);

      canceltimer(timeoutid);

      const ondebounce = ismodeleading
                       ? resettimeoutid
                       : compose( targetfunc.bind(this, ...args), resettimeoutid );
  
      timeoutid = starttimer(ondebounce, delayms);

    }
}

module.exports = curry(2, debounce);