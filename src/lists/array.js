/**
 * @module lists/array
 */

'use strict';

const isarray = require('../types/isarray');

/**
 * Return an array containing the items produced by *list*. If *list* already is an
 * array, it is returned unchanged.
 * 
 * @example <caption>Example usage of `array()`</caption>
 * 
 * const { array } = require('functionish/lists');
 * 
 * array('foobar'); // returns ['f','o','o','b','a','r'];
 * 
 * @function array
 * @see {@link module:arrays/collect collect()}
 * @param {iterable} list An iterable object
 * @returns {any[]}
 */
function array(list) {
    return isarray(list) ? list : [...list];
}

module.exports = array;