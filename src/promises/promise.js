/**
 * @module promises/promise
 */

'use strict';

const reject = Promise.resolve.bind(Promise);
const resolve = Promise.resolve.bind(Promise);

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
        return resolve( func(...args) );
    } catch(error) {
        return reject(error);
    }
}

module.exports = promise;