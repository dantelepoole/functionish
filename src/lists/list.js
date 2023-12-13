/**
 * @module lists/list
 */

'use strict';

const ERR_BAD_SOURCE = `functionish/lists/list(): The source argument has type %s. Expected an @@iterator-function or iterable object.`;

const compose = require('../compose');
const error = require('../errors/error');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

class List {

    constructor(iteratormethod) {
        this[Symbol.iterator] = iteratormethod;
        this[Symbol.isConcatSpreadable] = true;
    }

    [Symbol.iterator]

    [Symbol.isConcatSpreadable]
}

const islist = list => (list instanceof List);
const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);

/**
 * Return an object whose sole purpose is to be lazily iterable.
 * 
 * If the *source* is a function, it is assumed to be the \@\@iterator method to invoke when the returned object is
 * iterated over. This may a generator function or a function that returns an iterator object.
 * 
 * If the *source* is already a list object, it is returned unaltered.
 * 
 * Otherwise, the *source* is itself assumed to be an iterable object, and the returned object bind's to *source*'s
 * @@iterator method, effectively masking the *source* object itself. The return value will perform lazy iteration,
 * so it will reflects any changes to *source*'s contents in between iterations.
 * 
 * The returned object is also {@link external:Symbol.isConcatSpreadable concat-spreadable}.
 * 
 * @example <caption>Example usage of `list()`</caption>
 * 
 * const { list } = require('functionish/lists');
 * 
 * [to do]
 * 
 * @function list
 * @see {@link external:Symbol.isConcatSpreadable Symbol.isConcatSpreadable}
 * @param {*} source 
 * @returns 
 */
function list(source) {
    
    return isfunction(source) ? new List(source)
         : islist(source) ? source
         : isiterable(source) ? new List( source[Symbol.iterator].bind(source) )
         : raisebadsource(source);
}

module.exports = list;