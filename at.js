/**
 * @module at
 */

'use strict';

const ERR_BAD_INDEX = `AtError~The index %s. Expected an integer number.`;

const fail = require('./fail');
const isnan = require('./isnan');
const notinteger = require('./notinteger');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

/**
 * Retrieve the item from *indexable* at index *index* or `undefined` if no such item exists or
 * if *indexable* is not indexable.
 * 
 * If *index* is negative, it represents the index counting down from the end of *indexable*
 * (so -1 represents the last item in *list*).
 * 
 * `at()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const at = require('functionish/at');
 * 
 * const array = [1,2,3,42, 5];
 * const item = at(3, array);
 * console.log( item ); // prints `42`
 * 
 * @func at
 * @param {any[]} indexable The indexable object (e.g. Array) to retrieve the item from
 * @param {number} index The index of the item to retrieve
 * @returns {any}
 * @throws {Error} Error if *index* is `NaN` or not an integer number.
 */

module.exports = require('./curry2')(at);

function at(indexable, index) {

    notinteger(index) && failbadindex(index);

    return (index >= 0) ? indexable?.[index] : indexable?.[ index + indexable.length ];
}

function failbadindex(index) {

    const message = isnan(index) ? `is NaN`
                  : notnumber(index) ? `has type ${typeorclass(index)}`
                  : `is ${index}`;

    fail(ERR_BAD_INDEX, message);
}
