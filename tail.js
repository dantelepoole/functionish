/**
 * @module tail
 */

'use strict';

const ERR_BAD_SLICEABLE = `TailError~The argument has type %s. Expected an object with a slice() method or an iterable object.`;

const fail = require('./fail');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');

const issliceable = x => (typeof x?.slice === 'function');

/**
 * If `list` is an array, a shallow copy of `list` is returned without the first element. If `list` is
 * a string, a string is returned without the first character. If `list` is an iterable object, return an iterable
 * object containing all but the first item in *list*. Otherwise, throw an error.
 * 
 * @func tail
 * @see {@link module:head head()}
 * @param {iterable} list An object with a `slice()` method or an iterable object.
 * @returns {any}
 */
module.exports = function tail(list) {

    return issliceable(list) ? list.slice(1) 
         : isiterable(list) ? tailiterable(list)
         : fail(ERR_BAD_SLICEABLE, typeorclass(list));
}

function tailiterable(list) {

    return {
        [Symbol.iterator] : function () {

            const iterator = list[Symbol.iterator]();
            iterator.next();

            return iterator;
        }
    }
}