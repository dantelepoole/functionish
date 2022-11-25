/**
 * @module intersection
 */

'use strict';

const ERR_BAD_LIST = `IntersectionError~The %s list argument has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable producing all items common to both *list1* and *list2*, but without duplicates.
 * 
 * `intersection()` is curried by default with binary arity.
 * 
 * @func intersection
 * @param {iterable} list1 An iterable object
 * @param {iterable} list2 Another iterable object to intersect with
 * @returns {iterable}
 */
module.exports = require('./curry2') (

    function intersection(list1, list2) {

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
    
            [Symbol.iterator] : function* () {

                const list1values = new Set(list1);
                const intersectionfilter = list1values.delete.bind(list1values);
                
                for(const value of list2) if( intersectionfilter(value) ) yield value;
            }
        }
    }
)