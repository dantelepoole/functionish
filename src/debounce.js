/**
 * @module debounce
 */

'use strict';

const MODE_LEADING = 'leading';
const TIMER_NONE = undefined;

const compose = require('./compose');
const curry = require('./curry');
const isvoid = require('./types/isvoid');

/**
 * to do
 * 
 * @function debounce
 * @param {string} mode The debounce mode
 * @param {number} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} targetfunc The function to invoke
 * @returns {function}
 */
function debounce(mode, delayms, targetfunc) {

    const ismodeleading = isvoid(mode) || (mode !== MODE_LEADING);

    let timeoutid = TIMER_NONE;
    const timernotrunning = () => (timeoutid === TIMER_NONE);
    const resettimeout = () => (timeoutid = TIMER_NONE);

    return function _debounce(...args) {

      if( ismodeleading && timernotrunning() ) targetfunc.call(this, ...args);

      clearTimeout(timeoutid);

      const ondebounce = ismodeleading
                       ? resettimeout
                       : compose( targetfunc.bind(this, ...args), resettimeout );
  
      timeoutid = setTimeout(ondebounce, delayms);

    }
}

module.exports = curry(2, debounce);