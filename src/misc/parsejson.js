/**
 * @module misc/parsejson
 */
'use strict';

/**
 * Alias for {@link external:JSON.parse JSON.parse()}.
 * 
 * @func parsejson
 * @param {string} json The JSON-formatted string to parse
 * @param {function} [reviver] A transformation function for parsed values
 * @return {any}
 */
module.exports = JSON.parse;