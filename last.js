/**
 * @module last
 */

'use strict';

const ERR_BAD_INDEXABLE = `LastError~The indexable has type %s. Expected an indexable or iterable object.`;

const fail = require('./fail');
const isinteger = require('./isinteger');
const isiterable = require('./isiterable');
const isnan = require('./isnan');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

/**
 * Return the last item in *indexable* or `undefined` if *indexable* is empty. If *indexable* is neither indexable
 * nor iterable, an error is thrown. Any object with a `length`-property is considered indexable.
 * 
 * @func last
 * @param {indexable} indexable The indexable or iterable object to retrieve the last item from
 * @returns {any}
 * @example
 *     
 * const last = require('functionish/last');
 * 
 * last([1,2,3]); // returns 3
 * last([]); // returns undefined
 * last('foobar'); // returns 'r'
 * 
 */
module.exports = function last(indexable) {

    return isinteger(indexable?.length) ? indexable[indexable.length - 1]
         : isiterable(indexable) ? iterablelast(indexable)
         : fail(ERR_BAD_INDEXABLE, typeorclass(indexable));
}

function iterablelast(iterable) {

    let result = undefined;

    for(const value of iterable) result = value;

    return result;
}
