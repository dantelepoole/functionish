/**
 * @module zip
 */

'use strict';

const ERR_BAD_LIST = `ZipError~The %s list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an iterable that produces a 2-element array on each iteration containing the next item from *list1* and
 * the next item from *list2*. The returned iterable completes as soon as either arguments completes.
 * 
 * `zip()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const zip = require('functionish/zip');
 * 
 * const list1 = [1,2,3,4,5];
 * const list2 = [6,7,8];
 * 
 * for(const item of zip(list1, list2)) console.log(item);
 * 
 * // prints:
 * //   [1,6]
 * //   [2,7]
 * //   [3,8]
 * 
 * @func zip
 * @see {@link module:zipwith zipwith()}
 * @param {iterable} list1 The iterable to zip with the items from *list2* 
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
module.exports = require('./curry2')(

    function zip(list1, list2) {
    
        if( notiterable(list1) ) fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        if( notiterable(list2) ) fail(ERR_BAD_LIST, 'second', typeorclass(list2));
        
        return {
            [Symbol.iterator]() {

                const iterator1 = list1[Symbol.iterator]();
                const iterator2 = list2[Symbol.iterator]();

                return { 
                    next() {
                        const item1 = iterator1.next();
                        const item2 = iterator2.next();
                
                        return (item1.done || item2.done) ? { done:true }
                                                          : { done:false, value:[item1.value, item2.value] }
                    }
                }
            }
        }
    }
)