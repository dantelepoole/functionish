/**
 * @module collect
 */

'use strict';

const ERR_NOT_ITERABLE = `CollectError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const isarray = require('./isarray');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an array containing the items produced by the iterable *list*. If *list* is an array, *list* itself is
 * returned. If *list* is not iterable, an error is thrown.
 * 
 * @func collect
 * @param {iterable} list An iterable object producing the items to collect
 * @returns {any[]}
 */

module.exports = function collect(list) {
    
    notiterable(list) && fail(ERR_NOT_ITERABLE, typeorclass(list));

    return isarray(list) ? list : Array.from(list);
}