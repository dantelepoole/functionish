/**
 * @module lists/list
 */

'use strict';

const ERR_BAD_SOURCE = `functionish/lists/list(): The source argument has type %s. Expected an @@iterator-function or iterable object.`;

const List = require('../../lib/List');

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const islist = require('../types/islist');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);

/**
 * Return a List-instance whose sole purpose is to be lazily iterable.
 * 
 * If the *source* is a function, it is assumed to be the `@@iterator` function to invoke when the returned object is
 * iterated over. This may be any function that returns an iterator object, e.g. a generator function.
 *  
 * If the *source* is already a List instance, it is returned unaltered.
 * 
 * Otherwise, the *source* is itself assumed to be an iterable object, and the returned object bind's to *source*'s
 * @@iterator method, effectively masking the *source* object itself. The return value will perform lazy iteration,
 * so it will reflects any changes to *source*'s contents in between iterations.
 * 
 * The returned object has a {@link external:Symbol.isConcatSpreadable Symbol.isConcatSpreadable} property set to
 * `true`.
 * 
 * @example <caption>Example usage of `list()`</caption>
 * 
 * const { list } = require('functionish/lists');
 * 
 * const array = [1,2,3];
 * const x1 = list(array);
 * 
 * typeof x1; // 'object'
 * x1 === array; // false
 * 
 * [...x1]; // [1,2,3];
 * array..clear;
 * [...x1]; // []
 * 
 * const yieldnumbers = function* () { yield 1; yield 2; yield 3 }
 * const x2 = list(yieldnumbers);
 * 
 * typeof x2; // 'object';
 * x2 === yieldnumbers; // false
 * [...x2]; // [1,2,3]
 * 
 * @function list
 * @see {@link external:Symbol.isConcatSpreadable Symbol.isConcatSpreadable}
 * @param {(List|function|iterable)} source 
 * @returns 
 */
function list(source) {
    
    return islist(source) ? source
         : isfunction(source) ? new List(source)
         : isiterable(source) ? new List( source[Symbol.iterator].bind(source) )
         : raisebadsource(source);
}

module.exports = list;