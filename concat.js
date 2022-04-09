/**
 * If *list* is concatable (i.e. has a `concat()` method), pass *otherlists* to it and return the result. Otherwise,
 * if *list* is iterable, convert it to an array and pass *otherlists* to the array's `concat()` method. If *list* is
 * neither, create a single-element array with *list* and concatenate *otherlists* to it.
 * 
 * @module concat
 * @param {any[]} list The array or iterable of items to concat the other lists to
 * @param  {...any} otherlists The other lists or items to concat to *list*
 * @returns {any[]}
 * @example
 * 
 * const concat = require('functionish/concat');
 * 
 * const hari = "Hari"
 * const seldon = "Seldon"
 * concat(hari, seldon); // returns 'HariSeldon'
 * 
 * const list1 = [1,2];
 * const list2 = [3,4];
 * const list3 = [5,6];
 * concat(list1, list2, list3); // prints '[1,2,3,4,5,6]
 * 
 */

'use strict';

const isiterable = require('./lib/isiterable');

const isconcatable = value => (typeof value?.concat === 'function');

module.exports = function concat(list, ...otherlists) {

    return isconcatable(list) ? list.concat(...otherlists)
        : isiterable(list) ? [...list].concat(...otherlists)
        : (arguments.length > 0) ? [ list ].concat(...otherlists)
        : [];
}