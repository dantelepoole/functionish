/**
 * @module onfinally
 */

'use strict';

const ERROR_NONE = undefined;
const FINALLY_NONE = undefined;
const RESULT_NONE = undefined;

const curry  = require('./curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `onfinally()`</caption>
 * 
 * to do
 * 
 * @function onfinally
 * @param {function} finallyhandler to do
 * @param {function} func The function to run
 * @returns {any}
 */
function onfinally(finallyhandler, func, ...partialargs) {

    return function _onfinally(...args) {

        try {

            const result = func.call(this, ...partialargs, ...args);
            
            const finallyresult = finallyhandler(ERROR_NONE, result, ...partialargs, ...args);

            return (finallyresult === FINALLY_NONE)
                 ? result
                 : finallyresult;

        } catch(error) {
            
            const finallyresult = finallyhandler(error, RESULT_NONE, ...partialargs, ...args);

            if(finallyresult === FINALLY_NONE) throw error;

            return finallyresult;
        }
    }
}

module.exports = curry(1, onfinally);