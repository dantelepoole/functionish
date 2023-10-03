/**
 * @module types/iscurriedfunction
 */

'use strict';

const CurryArity = require('../curry').CurryArity;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `iscurriedfunction()`</caption>
 * 
 * [to do]
 * 
 * @function iscurriedfunction
 * @param {function} func The function to check
 * @returns {boolean}
 */
function iscurriedfunction(func) {
    return (typeof func === 'function') && (func[CurryArity] > 0);
}

module.exports = iscurriedfunction;