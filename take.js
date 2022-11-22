/**
 * @module take
 */

'use strict';

const ERR_BAD_COUNT = `TakeError~The itemcount %s. Expected a positive integer number.`;
const ERR_BAD_LIST = `TakeError~The list has type %s. Expected an iterable object.`;

const and = require('./and');
const fail = require('./fail');
const isgreaterthanorequal = require('./isgreaterthanorequal');
const isinteger = require('./isinteger');
const isnumber = require('./isnumber');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

const ispositiveinteger = and(isinteger, isgreaterthanorequal(0));

/**
 * Return an iterable object containing the first *itemcount* items produced by *list*.
 * 
 * `take()` is curried by default with binary arity.
 * 
 * @func take
 * @param {number} itemcount The number of items to take from *list*
 * @param {iterable} list An iterable object.
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function take(itemcount, list) {

        checkcount(itemcount);

        itemcount = Math.max(0, itemcount);

        notiterable(list) && fail(ERR_BAD_LIST, typeorclass(list));

        return {
            [Symbol.iterator] : function* () {
    
                let counter = 0;
    
                for(const item of list) {
                    
                    if( isgreaterthanorequal(itemcount, counter) ) break;
    
                    counter += 1;
    
                    yield item;
                }
            }
        }

    }
)

function checkcount(count) {

    if( ispositiveinteger(count) ) return count;

    fail(ERR_BAD_COUNT, isnumber(count) ? `is ${count}` : `has type ${typeorclass(count)}`);
}