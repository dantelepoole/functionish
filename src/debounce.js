/**
 * @module debounce
 */

'use strict';

const MODE_IMMEDIATE = 'immediate';

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

    const modeimmediate = (mode === MODE_IMMEDIATE);

    let timeoutid = undefined;
    const notpending = () => (timeoutid === undefined);
    const resettimeout = () => (timeoutid = undefined);
    const cleartimeout = () => clearTimeout(timeoutid);
    const settimeout = delayedfunc => (timeoutid = setTimeout(delayedfunc, delayms));

    return function _debounce(...args) {

      if( modeimmediate && notpending() ) func(...args);

      cleartimeout();

      const ondebounce = modeimmediate
                     ? resettimeout
                     : () => cleartimeout() + func(...args);
  
      settimeout(ondebounce);

    }
}

module.exports = curry3(debounce);