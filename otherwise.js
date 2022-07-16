/**
 * @module otherwise
 */

'use strict';

const callable = require('./callable');

/**
 * To be used to create a default branch for {@link module:select select()}.
 * 
 * This function creates a default branch, i.e. a branch that is called if no other branch is executed. It always
 * executes the *action*.
 * 
 * If *action* is not a function, its value will be returned directly instead.
 * 
 * See {@link module:select select()} for example code.
 * 
 * @func otherwise
 * @see {@link module:select select()}
 * @see {@link module:branch branch()}
 * @param {any} defaultaction The function to call or value to return by default if no other branch is executed.
 * @returns {function} A default branch function that can be passed to {@link module:select select()}
 */
module.exports = function otherwise(defaultaction) {

    defaultaction = callable(defaultaction);

    return function _defaultbranch_() {
        return defaultaction;
    }
}