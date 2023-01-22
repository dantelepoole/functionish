/**
 * @module misc/tojson
 */

'use strict';

/**
 * Alias for {@link external:JSON.stringify JSON.stringify()}.
 * 
 * @function tojson
 * @see {@link external:JSON.stringify JSON.stringify()}
 * @see {@link module:misc/parsejson parsejson()}
 * @param {any} value The value to serialize to JSON
 * @param {function} [replacer] A transformation function for values to serialize
 * @param {(String|Number)} [space] A String or Number object that's used to insert white space (including indentation,
 *                                  line break characters, etc.) into the output JSON string for readability purposes.
 * @returns {string}
 */
module.exports = JSON.stringify;