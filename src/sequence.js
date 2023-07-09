/**
 * @module sequence
 */

'use strict';

const invoke = (context, args) => func => func.call(context, ...args);
const sequencerunnerfactory = funcs => (context, args) => funcs.map( invoke(context, args) );

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

    const runsequence = sequencerunnerfactory(funcs);

    return function _sequence(...args) {
        return runsequence(this, args);
    }
}

module.exports = sequence;