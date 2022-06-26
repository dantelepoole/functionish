/**
 * @module concat
 */

'use strict';

const ERR_BAD_CONCATABLE = `ConcatError~The concatable has type %s. Expected an object with a concat() method or an iterable object`;

const concatlist = require('./concatlist');
const fail = require('./fail');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');

const isconcatable = obj => (typeof obj?.concat === 'function');

/**
 * Pass the *items* to *concatable*'s `concat()` method. If *concatable* has no such method but it is iterable, 
 * return an iterable object that produces *concatable*'s items followed by *items*' items.
 * 
 * `concat()` is curried by default.
 * 
 * @example
 * 
 * const concat = require('functionish/concat');
 * 
 * concat([1,2], 3, 4); // returns '[1,2,3,4]'
 * concat('foo', 'bar'); // return 'foobar';
 * 
 * @func concat
 * @param {(concatable|iterable)} concatable An object with a concat() method or an iterable object
 * @param  {...any[]} items The items to concat to *concatable*
 * @returns {any}
 * @throws {Error} Error if *concatable* has no `concat()` method and is not iterable.
 */

module.exports = require('./curry2') (

    function concat(concatable, ...items) {
        
        return isconcatable(concatable) ? concatable.concat(...items)
             : isiterable(concatable) ? concatlist(concatable, items)
             : fail(ERR_BAD_CONCATABLE, typeorclass(concatable));

    }
)