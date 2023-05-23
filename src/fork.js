/**
 * @module fork
 */

'use strict';

const sequence = require('./sequence');

/**
 * [to do]
 * 
 * @example <caption>Example usage of `fork()`</caption>
 * 
 * [to do]
 * 
 */
function fork(joinfunc, ...funcs) {

    const runsequence = sequence(...funcs);

    return function _fork(...args) {

        const sequenceresults = runsequence.call(this, ...args);

        return joinfunc.call(this, ...sequenceresults);
    }
}

module.exports = fork;