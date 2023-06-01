/**
 * @module sequence
 */

'use strict';

const bindapply = (context, args) => func => func.call(context, ...args);
const sequencerunner = funcs => (context, args) => funcs.map( bindapply(context, args) );

/**
 * [to do]
 * 
 * @example <caption>Example usage of `sequence()`</caption>
 * 
 * [to do]
 * 
 * @function sequence
 * @param  {...function} funcs One or more functions to run
 * @returns {function}
 */
function sequence(...funcs) {

    const runsequence = sequencerunner(funcs);

    return function _sequence(...args) {
        return runsequence(this, args);
    }
}

module.exports = sequence;