/**
 * @module promises/preject
 */

'use strict';

/**
 * Function variant of {@link external:Promise#reject Promise.reject()}.
 * 
 * @function preject
 * @param {*} error The value to reject
 * @returns {Promise}
 */
function preject(error) {
    return Promise.reject(error);
}

module.exports = preject;