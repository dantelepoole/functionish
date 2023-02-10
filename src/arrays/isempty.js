/**
 * @module arrays/isempty
 */

'use strict';

const querycountiterable = list => list[Symbol.iterator()]().next().done ? 0 : 1;

/**
 * Return `true` if *indexable* has a `length` or `size` property equal to `0` or
 * if *indexable* has no such properties at all.
 * 
 * @example <caption>Example usage of `isempty()`</caption>
 * 
 * const { isempty } = require('functionish/arrays');
 * 
 * isempty( [] ); //  returns true
 * isempty( '' ); // returns true
 * isempty( new Map() ); // returns true
 * isempty( new Set() ); // returns true    
 * 
 * isempty( {} ); // returns false
 * isempty( [undefined] ); // returns false
 * isempty( ' ' ); // returns false
 * 
 * @function isempty
 * @see {@link module:hasitems hasitems()}
 * @param {any} list The value to check
 * @returns {boolean}
 * 
 */
function isempty(list) {

    const itemcount = (list.length ?? list.size ?? querycountiterable(list));

    return (itemcount === 0);
}

module.exports = isempty;