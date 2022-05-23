/**
 * @module head
 */

'use strict';

/**
 * Return the first item in *iterable* or `undefined` if *iterable* is empty.
 * 
 * @example
 *     
 * const head = require('functionish/head');
 * 
 * head([1,2,3]); // returns 1
 * head(1); // returns 1
 * head([]); // returns `undefined`
 * head('foobar'); // returns 'f'
 * 
 * @func head
 * @param {iterable} iterable An iterable producing the items to retrieve the first item from.
 * @returns {any}
 */
module.exports = function head(iterable) {

    const firstitem = iterable?.[0];

    return (firstitem !== undefined) ? firstitem : headiterable(iterable);
}

function headiterable(iterable) {

    const firstitem = iterable[Symbol.iterator]().next();

    return firstitem.done ? undefined : firstitem.value;
}