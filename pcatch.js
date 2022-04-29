/** 
 * @module pcatch
 */

'use strict';

/**
 * Functional variant of {@link external:Promise.prototype.catch Promise.prototype.catch()}. Pass *onreject* to
 * *promise*'s `catch()` method and return the resulting Promise.
 * 
 * `pcatch()` is curried by default.
 * 
 * @func pcatch
 * @see {@link external:Promise.prototype.catch Promise.prototype.catch()}
 * @see {@link module:pmap pmap()}
 * @see {@link module:pfinally pfinally()}
 * @param {function} onreject The function to pass to *promise*'s `catch()` method
 * @param {Promise} promise The promise the attach *onreject* to
 * @returns {Promise}
 */
module.exports = require('./curry2')(

    function pcatch(onreject, promise) {
        return promise.catch(onreject);
    }
)