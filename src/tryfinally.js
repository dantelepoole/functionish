/**
 * @module tryfinally
 */

'use strict';

const THIS_NULL = null;

const curry = require('./curry');
const raise = require('./errors/raise');

/**
 * to do
 * 
 * @example <caption>Example usage of `tryfinally()`</caption>
 * 
 * to do
 * 
 * @function tryfinally
 * @param {function} onfinally to do
 * @param {function} func The function to run
 * @returns {any}
 */
function tryfinally(onfinally, func) {
    return _tryfinally.bind(THIS_NULL, onfinally, func);
}

function _tryfinally(finallyhandler, targetfunc, ...args) {

    const {data, iserror} = nothrow(targetfunc, ...args);

    const result = finallyhandler(data, iserror);

    return (result !== data) ? result
         : iserror ? raise(data)
         : data;
}

function nothrow(targetfunc, ...args) {

    try {
        return { data:targetfunc(...args), iserror:false }
    } catch(error) {
        return { data:error, iserror:true }
    }
}

module.exports = curry(1, tryfinally);