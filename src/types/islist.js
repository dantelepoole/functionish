/**
 * @module types/iserror
 */

'use strict';

const LazyList = require('../../lib/LazyList');

/**
 * Return `true` if the argument is a List instance, in which case it will be lazily iterable. Otherwise, return
 * `false`.
 * 
 * @example <caption>Example usage of `islist()`</caption>
 * 
 * const { list } = require('functionish/lists');
 * const { islist } = require('functionish/types');
 * 
 * islist( list([]) ); // returns true
 * islist( list( function* () { yield 42; } ) ); // returns true
 * 
 * islist(); // returns false
 * islist( [] ); // returns false
 * islist( 'list' ); // returns false
 * 
 * @function islist
 * @param {any} value The value to check
 * @returns {boolean}
 */
function islist(list) {
    return (list instanceof LazyList);
}

module.exports = islist;