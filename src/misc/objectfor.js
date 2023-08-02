/**
 * @module misc/objectfor
 */

'use strict';

const THIS_NULL = null;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `objectfor()`</caption>
 * 
 * [to do]
 * 
 * @function objectfor
 */
function objectfor(...keys) {
    return _objectfor.bind(THIS_NULL, keys);
}

function _objectfor(keys, ...properties) {

    const target = {}

    for(let i = 0; i < keys.length; i += 1) target[ keys[i] ] = properties[i];

    return target;
}

module.exports = objectfor