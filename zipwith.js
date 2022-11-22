/**
 * @module zipwith
 */

'use strict';

const ERR_BAD_LIST = `ZipwithError~The %s list has type %s. Expected an iterable object.`;

const fail = require('./fail');
const notiterable = require('./notiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

/**
 * Similar to  {@link module:zip zip()} except that the returned iterable returns the result of applying *func* to the
 * elements of *list1* and *list2*.
 * 
 * `zipwith()` is curried by default.
 * 
 * @example
 *     
 * const zipwith = require('functionish/zipwith');
 * 
 * function sum(x,y) { return (x+y) }
 * 
 * const list1 = [1,2,3,4,5];
 * const list2 = [6,7,8];
 * 
 * for(const item of zipwith(sum, list1, list2)) console.log(item);
 * 
 * // prints:
 * //   7
 * //   9
 * //   11
 * 
 * @func zipwith
 * @see {@link module:zip zip()}
 * @param {function} func The function to apply to the items from *list1* and *list2*
 * @param {iterable} list1 The iterable to zip with the items from *list2*
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
module.exports = require('./curry3')(

    function zipwith(func, list1, list2) {

        func = resolvefunction(func);

        notiterable(list1) && fail(ERR_BAD_LIST, 'first', typeorclass(list1));
        notiterable(list2) && fail(ERR_BAD_LIST, 'second', typeorclass(list2));

        return {
            [Symbol.iterator]() {

                const iterator1 = list1[Symbol.iterator]();
                const iterator2 = list2[Symbol.iterator]();

                return { 
                    next() {
                        const item1 = iterator1.next();
                        const item2 = iterator2.next();
                
                        return (item1.done || item2.done) ? { done:true }
                                                          : { done:false, value:func(item1.value, item2.value)}
                    }
                }
            }
        }
    }

)