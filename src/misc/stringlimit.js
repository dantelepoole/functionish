/**
 * @module misc/stringlimit
 */

'use strict';

const ELLIPSIS = '...';

const curry = require('../curry');

/**
 * to do
 * 
 * @example <caption>Example usage of `stringlimit()`</caption>
 *
 * to do 
 * 
 * @function stringlimit
 * @returns {string}
 */
function stringlimit(limitmarker=ELLIPSIS, maxcharacters, string) {
    
    return (string.length <= maxcharacters) ? string
         : (maxcharacters <= limitmarker.length) ? string.slice(0, maxcharacters)
         : string.slice(0, maxcharacters - limitmarker.length) + limitmarker;
}

module.exports = curry(1, stringlimit);