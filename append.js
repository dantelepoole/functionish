/**
 * @module append
 */

'use strict';

const ERR_BAD_ITERABLE = `AppendError~The %s has type %s. Expected an iterable object`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable object that produces *list1*'s items followed by *list2*'s items. `append()` differs from
 * {@link module:union union()} in that, unlike {@link module:union union()}, `append()` does *not* discard duplicate
 * items.
 * 
 * `append()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const append = require('functionish/append');
 * 
 * Array.from( append([1,2], [3,4]) ); // returns '[1,2,3,4]'
 * 
 * @func append
 * @see {@link module:union union()}
 * @param {iterable} list1 The iterable object to append *list2* to
 * @param  {iterable} list2 The iterable object to append to *list1*
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function append(list1, list2) {
        
        if( notiterable(list1) ) fail(ERR_BAD_ITERABLE, 'list1', typeorclass(list1));
        if( notiterable(list2) ) fail(ERR_BAD_ITERABLE, 'list2', typeorclass(list2));

        return {
            [Symbol.iterator] : function* () {
                yield* list1;
                yield* list2;
            }
        }
    }
)