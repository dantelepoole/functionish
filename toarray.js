/**
 * @module toarray
 */

'use strict';

const unary = require('./unary');

/**
 * Return a new Array initialized with the items from *iterable*. If *mapfunc* is provided, each item is passed to
 * *mapfunc* and the return array is initialized with *mapfunc*'s return values instead.
 * 
 * @func toarray
 * @param {iterable} [iterable] An iterable that produces the items to initialize the array with
 * @param {function} [mapfunc] The func to map each item produced by *iterable* with
 * @returns {any[]}
 */
module.exports = function toarray(iterable=[], mapfunc=undefined) {

    if(typeof mapfunc === 'function') mapfunc = unary(mapfunc);

    return Array.from(iterable, mapfunc);
}