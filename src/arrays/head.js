/**
 * @module arrays/head
 */

'use strict';

const isarray = require('../types/isarray');

/**
 * Return the first item in *indexable* or `undefined` if *indexable* is empty.
 * 
 * @example <caption>Example usage of `head()`</caption>
 * 
 * const {head} = require('functionish/arrays');
 * 
 * head([1,2,3]); // returns 1
 * head([]); // returns `undefined`
 * head('foobar'); // returns 'f'
 * 
 * @function head
 * @param {indexable} list An indexable object
 * @returns {any}
 */
function head(list) {
    
    return isarray(list)
         ? list[0]
         : headiterable(list);
}

function headiterable(list) {

    const firstitem = list[Symbol.iterator]().next();

    if( ! firstitem.done ) return firstitem.value;
}

module.exports = head;