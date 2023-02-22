/**
 * @module debounce
 */

'use strict';

const MODE_LEADING = 'leading';
const TIMER_NONE = undefined;

const compose = require('./compose');
const curry3 = require('./curry3');

/**
 * to do
 * 
 * @function debounce
 * @param {string} mode The debounce mode
 * @param {number} delayms The number of milliseconds to delay the invocation of *func*
 * @param {function} func The function to invoke
 * @returns {function}
 */
function debounce(mode, delayms, func) {

    const ismodeleading = (mode === MODE_LEADING);

    let timeoutid = TIMER_NONE;
    const timernotrunning = () => (timeoutid === TIMER_NONE);
    const resettimeout = () => (timeoutid = TIMER_NONE);

    return function _debounce(...args) {

      if( ismodeleading && timernotrunning() ) func(...args);

      clearTimeout(timeoutid);

      const ondebounce = ismodeleading
                       ? resettimeout
                       : compose(resettimeout(), func(...args));
  
      timeoutid = setTimeout(ondebounce, delayms);

    }
}

module.exports = curry3(debounce);