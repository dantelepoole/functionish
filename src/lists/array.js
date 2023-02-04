/**
 * @module lists/array
 */

'use strict';

/**
 * Return an array containing the items produced by *list*. If *list* itself is an
 * array, a shallow copy is returned.
 * 
 * @example <caption>Example usage of `array()`</caption>
 * 
 * const {array} = require('functionish/lists');
 * 
 * array('foobar'); // returns ['f','o','o','b','a','r'];
 * 
 * @function array
 * @see {@link module:arrays/collect collect()}
 * @param {iterable} list An iterable object
 * @returns {any[]}
 */
function array(list) {
    return [...list];
}

module.exports = array;