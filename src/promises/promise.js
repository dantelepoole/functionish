/**
 * @module promises/promise
 */

'use strict';

/**
 * Pass *args* to *func* and return the result as a Promise.
 * 
 * @function promise
 * @see {@link module:promises/promisify promisify()}
 * @param {function} func The function to run
 * @param  {...any} args The argument to pass to *func*
 * @returns {Promise}
 */
function promise(func, ...args) {

    try {
        return Promise.resolve( func(...args) );
    } catch(error) {
        return Promise.reject(error);
    }
}

module.exports = promise;