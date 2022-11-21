/**
 * @module head
 */

'use strict';

const ERR_BAD_LIST = `HeadError~The list has type %s. Expected an indexable or iterable object.`;

const fail = require('./fail');
const isnumber = require('./isnumber');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const getiterator = iterable => iterable[Symbol.iterator]();

/**
 * Return the first item in *list* or `undefined` if *list* is empty.
 * 
 * @example
 * const head = require('functionish/head');
 * 
 * head([1,2,3]); // returns 1
 * head([]); // returns `undefined`
 * head('foobar'); // returns 'f'
 * 
 * @func head
 * @param {(indexable|iterable)} list An indexable or iterable object
 * @returns {any}
 */
module.exports = function head(list) {
    
    if( isnumber(list?.length) ) return list[0];

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    const firstitem = getiterator(list).next();

    if( ! firstitem.done ) return firstitem.value;
}
