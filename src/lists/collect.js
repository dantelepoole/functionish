/**
 * @module lists/collect
 */

'use strict';

/**
 * Return an array containing the items produced by *list*.
 * 
 * @func collect
 * @param {iterable} list An iterable object producing the items to collect
 * @returns {any[]}
 */

module.exports = function collect(list) {
    return [...list];
}