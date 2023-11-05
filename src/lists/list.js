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

    constructor(aaiterator) {
        this[Symbol.iterator] = aaiterator;
    }

    [Symbol.iterator]
}

const raisebadsource = compose(raise, error.Type(ERR_BAD_SOURCE), typeorclassname);
const islist = list => (list instanceof List);

/**
 * to do
 * 
 * @function list
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