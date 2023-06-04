/**
 * @module safe
 */

'use strict';

const ERROR_NONE = null;
const DATA_NONE = undefined;

const curry = require('./curry');
/**
 * to do
 * 
 * @example <caption>Example usage of `safe()`</caption>
 * 
 * to do
 * 
 * @function safe
 * @returns {any}
 */
function safe(func, ...partialargs) {

    const curryarity = func.curryarity - partialargs.length;

    return (curryarity > 0)
         ? curry(curryarity, _safe)
         : _safe;

    function _safe(...args) {

        try {
            return [ ERROR_NONE, func.call(this, ...partialargs, ...args) ];
        } catch(exception) {
            return [exception, DATA_NONE];
        }

    }
}

module.exports = safe;