/**
 * @module branch
 */

'use strict';

const callable = require('./callable');
const curry2 = require('./curry2');

/**
 * To be used to create branches for {@link module:select select()}.
 * 
 * This function accepts a *predicate* function and an *action* function and returns a branch function that can be
 * passed to {@link module:select select()}. If the *predicate* returns `true` for a given set of arguments, those
 * arguments will be passed to *action* and the result is returned. Otherwise, {@link module:select select()} will move
 * to the next branch.
 * 
 * If *predicate* and/or the *action* are not functions, their value will be used directly.
 * 
 * See {@link module:select select()} for example code.
 * 
 * `branch()` is curried by default with binary arity.
 * 
 * @func branch
 * @see {@link module:select select()}
 * @see {@link module:otherwise otherwise()}
 * @param {any} predicate The predicate to test before selecting this branch
 * @param {any} action The function to call or value to return if the *predicate* is matched
 * @returns {function} A branch function that can be passed to {@link module:select select()}
 */
module.exports = curry2(

    function branch(predicate, action) {

        predicate = callable(predicate);
        action = callable(action);

        return function _branch_(rejectbranch) {
            return (...args) => predicate(...args) ? action(...args) : rejectbranch(...args);
        }
    }
)