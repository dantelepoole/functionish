/**
 * @module misc/objectfrom
 */

'use strict';

const entrybuilder = (values, i=0) => key => ([key, values[i++]]);
const objectfromentries = Object.fromEntries;

/**
 * [to do]
 * 
 * @example <caption>Example usage of `objectfrom()`</caption>
 * 
 * [to do]
 * 
 * @function objectfrom
 */
function objectfrom(...keys) {
    return (...values) => objectfromentries( keys.map( entrybuilder(values) ) );
}

module.exports = objectfrom