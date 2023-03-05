/**
 * @module promises/pfinally
 */

'use strict';

const compose = require('../compose');
const curry = require('../curry');
const flip = require('../flip');
const raise = require('../misc/raise');
const tap = require('../tap');

const initreject = compose(raise, tap);
const initresolve = compose(tap, flip);

/**
 * Functional variant of {@link external:Promise.prototype.finally Promise.prototype.finally()}.
 * 
 * [to do: fulfilled value is passed]
 * 
 * `pfinally()` is curried by default with unary arity.
 * 
 * @function pfinally
 * @param {function} onfinally The finally handler to call
 * @param {Promise} promise The promise to attach *onfinally* to
 * @returns {Promise}
 */
function pfinally(onfinally, promise) {

    const onresolve = initresolve(onfinally);
    const onreject = initreject(onfinally);

    return promise.then(onresolve, onreject);
}

module.exports = curry(1, pfinally);