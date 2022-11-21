/**
 * @module flat
 */

'use strict';

const ERR_BAD_LIST = `FlatError~The list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const isiterable = require('./isiterable');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that flattens the values in *list* by one level, meaning that if any
 * value in list is iterable, that value itself is expanded.
 * 
 * @func flat
 * @param {iterable} list An iterable object
 * @returns {iterable}
 */
module.exports = function flat(list) {

    notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

    return {
        [Symbol.iterator] : function* () {
            for(const value of list) if( isiterable(value) ) yield* value; else yield value;
        }
    }
}