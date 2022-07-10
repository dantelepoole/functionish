/**
 * @module take
 */

'use strict';

const ERR_BAD_COUNT = `TakeError~The count %s. Expected a positive integer number.`;
const ERR_BAD_LIST = `TakeError~The list has type %s. Expected an object with a slice() method or an iterable object.`;

const fail = require('./fail');
const isinteger = require('./isinteger');
const isiterable = require('./isiterable');
const typeorclass = require('./typeorclass');

const issliceable = x => (typeof x?.slice === 'function');

/**
 * If *list* has a `slice()`, invoke it as `slice(0, *count*)` and return the result. If *list* is an iterable object,
 * return an iterable object containing the first *count* items produced by *list*. Otherwise, throw an error.
 * 
 * `take()` is curried by default with binary arity.
 * 
 * @func take
 * @param {number} count The number of items to take from *list*
 * @param {iterable} list An object with a `slice()` method or an iterable object.
 * @returns {any}
 */
module.exports = require('./curry2')(

    function take(count, list) {

        checkcount(count);

        count = Math.max(0, count);

        return issliceable(list) ? list.slice(0, count)
             : isiterable(list) ? takeiterable(count, list)
             : fail(ERR_BAD_LIST, typeorclass(list));

    }
)

function checkcount(count) {

    if( isinteger(count) && count >= 0 ) return count;

    const message = (typeof count === 'number') ? `is ${count}` : `has type ${typeorclass(count)}`;
    fail(ERR_BAD_COUNT, message);
}

function takeiterable(itemcount, list) {

    return {
        [Symbol.iterator] : function* () {

            let counter = 0;

            for(const item of list) {
                
                if(counter >= itemcount) break;

                counter += 1;

                yield item;
            }
        }
    }
}