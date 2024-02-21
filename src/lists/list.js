/**
 * @module lists/list
 */

'use strict';

const LazyList = require('../../lib/LazyList');

const isfunction = require('../types/isfunction');

/**
 * Return a LazyList-instance whose sole purpose is to be lazily iterable.
 * 
 * If the *source* is a function, it is assumed to be the `@@iterator` function to invoke when the returned object is
 * iterated over. This may be any function that returns an iterator object, e.g. a generator function. Any *args* are
 * passed to the *source* function.
 *  
 * If the *source* is already a LazyList instance, it is returned unaltered.
 * 
 * Otherwise, the *source* is itself assumed to be an iterable object, and the returned object binds to *source*'s
 * `@@iterator` method, effectively masking the *source* object itself. The return value will perform lazy iteration,
 * so it will reflects any changes to *source*'s contents in between iterations. In this case the *args*, if any,
 * are ignored.
 * 
 * @example <caption>Example usage of `list()`</caption>
 * 
 * const { list } = require('functionish/lists');
 * 
 * const array = [1,2,3];
 * const list1 = list(array);
 * 
 * typeof list1; // 'object'
 * list1 === array; // false
 * 
 * [...list1]; // [1,2,3];
 * array.clear;
 * [...list1]; // []
 * 
 * const yieldnumbers = function* () { yield 1; yield 2; yield 3 }
 * const list2 = list(yieldnumbers);
 * 
 * typeof list2; // 'object';
 * list2 === yieldnumbers; // false
 * [...list2]; // [1,2,3]
 * 
 * @function list
 * @param {(function|iterable)} source The function or iterable object to create the list with
 * @param {...any[]} args Optional arguments to pass to *source* if it is a function
 * @returns 
 */
function list(source, ...args) {
    return LazyList.from(source, ...args);
}

module.exports = list;