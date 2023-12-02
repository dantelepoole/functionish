/**
 * @module misc/debounce
 */

'use strict';

const ERROR_BAD_TARGET_FUNCTION = `functionish/debounce(): The target function has type '%'. Expected a function.`;
const ERROR_BAD_MODE = `functionish/debounce(): The mode argument is '%s'. Expected 'leading' or 'trailing'.`;
const ERROR_DELAYMS = `functionish/debounce(): The delayms argument is '%s'. Expected a positive integer.`;
const MODE_LEADING = 'leading';
const MODE_TRAILING = 'trailing';
const TIMER_IDLE = undefined;

const compose = require('../compose');
const curry2 = require('../curry2');
const format = require('./format');
const isfunction = require('../types/isfunction');
const isinteger = Number.isSafeInteger;
const partial = require('../partial');
const raise = require('./raise');
const typeorclassname = require('../types/typeorclassname');

const canceltimer = clearTimeout;
const starttimer = setTimeout;

const targetfunctionerror = partial(format, ERROR_BAD_TARGET_FUNCTION);
const raisetargetfunctionerror = func => raise( new TypeError( targetfunctionerror(typeorclassname(func) ) ) );
const validatetargetfunction = func => isfunction(func) || raisetargetfunctionerror(func);

const modeerror = partial(format, ERROR_BAD_MODE);
const raisemodeerror = mode => raise( new TypeError( modeerror(mode) ) );
const validatemode = mode => (mode === MODE_LEADING) || (mode === MODE_TRAILING) || raisemodeerror(mode);

const delaymserror = partial(format, ERROR_DELAYMS);
const raisedelaymserror = delayms => raise( new TypeError( delaymserror(delayms) ) );
const validatedelayms = delayms => (isinteger(delayms) && (delayms > 0)) || raisedelaymserror(delayms);

/**
 * to do
 * 
 * @example <caption>Example usage of `()`</caption>
 * 
 * to do
 * 
 * @function debounce
 * @param {string} [mode='leading'] The debounce mode: 'leading' (default) or 'trailing'
 * @param {number} delayms The number of milliseconds to delay the invocation of *targetfunc*
 * @param {function} targetfunc The function to invoke
 * @returns {function}
 */
const debounce = curry2(function debounce(mode=MODE_LEADING, delayms, targetfunc) {

    validatemode(mode);
    validatedelayms(delayms);
    validatetargetfunction(targetfunc);

    const ismodeleading = (mode === MODE_LEADING);

    let timeoutid = TIMER_IDLE;
    const istimeridle = () => (timeoutid === TIMER_IDLE);
    const resettimer = () => (timeoutid = TIMER_IDLE);

    return function _debounce(...args) {

      if( ismodeleading && istimeridle() ) targetfunc.call(this, ...args);

      canceltimer(timeoutid);

      const ondebounce = ismodeleading
                      ? resettimer
                      : compose( targetfunc.bind(this, ...args), resettimer );
  
      timeoutid = starttimer(ondebounce, delayms);

    }
})

module.exports = debounce;