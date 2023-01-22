/**
 * @module misc/parsejson
 */
'use strict';

/**
 * Alias for {@link external:JSON.parse JSON.parse()}.
 * 
 * @function parsejson
 * @see {@link external:JSON.parse JSON.parse()}
 * @see {@link module:misc/tojson tojson()}
 * @param {string} json The JSON-formatted string to parse
 * @param {function} [reviver] A transformation function for parsed values
 * @return {any}
 */
module.exports = JSON.parse;