/**
 * @module tail
 */

'use strict';

const ERR_BAD_LIST = `TailError~The list has type %s. Expected a slicable or iterable object.`;

const fail = require('./fail');
const isfunction = require('./isfunction');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const getiterator = iterable => iterable[Symbol.iterator]();

/**
 * Return an iterable object that produces all values in *list* except the first one. If *list*
 * has a `slice()` method, it is called. Otherwise, an iterable object is returned that produces
 * all but first value in *list*.
 * 
 * @func tail
 * @param {iterable} list A slicable or iterable object.
 * @returns {any}
 */
module.exports = function tail(list) {

    if( isfunction(list?.slice) ) return list.slice(1);

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {

        [Symbol.iterator] : function () {

            const iterator = getiterator(list);
            
            iterator.next();

            return iterator;
        }
    }
}