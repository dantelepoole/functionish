/**
 * @module promises/presolve
 */

'use strict';

/**
 * Function variant of {@link external:Promise#resolve Promise.resolve()}.
 * 
 * @function presolve
 * @param {*} value The value to resolve to
 * @returns {Promise}
 */
function presolve(value) {
    return Promise.resolve(value);
}

module.exports = presolve;