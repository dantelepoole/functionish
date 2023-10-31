/**
 * @module objects/objectfrom
 */

'use strict';

const objectfromentries = Object.fromEntries;

/**
 * to do
 * 
 * @example <caption>Example usage of `objectfrom()`</caption>
 * 
 * to do
 * 
 * @function objectfrom
 */
function objectfrom(...keys) {
    return (...values) => objectfromentries( zipentries(keys, values) );
}

function* zipentries(keys, values) {
    for(let i = 0; i < keys.length; i += 1) yield [ keys[i], values[i] ];
}

module.exports = objectfrom;