/**
 * @module lists/batch
 */

'use strict';

const MINIMUM_BATCHSIZE = 1;

const curry2 = require('../curry2');

const maximum = Math.max;

/**
 * Return an iterable of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used.
 * 
 * The returned iterable object is lazy, meaning it iterates over *list* only when it
 * is iterated over itself. If you change the contents of *list* after calling `batch()`
 * and before processing the returned iterable, the changes will be reflected in the
 * returned iterable. If this not the desired behaviour, iterate over the returned 
 * iterable immediately after calling `batch()` (e.g. by loading it into an array).
 * 
 * `batch()` is curried by default with binary arity.
 * 
 * @example <caption>Example usage of `batch()`</caption>
 * 
 * const { batch } = require('functionish/lists');
 * 
 * const list = [1,2,3,4,5,6,7,8,9,10,11,12];
 * 
 * const batches = batch(5, list);
 * 
 * Array.from(batches); // returns [ [1,2,3,4,5], [6,7,8,9,10], [11,12] ]
 * 
 * @function batch
 * @param {number} batchsize The maximum number of items in each batch
 * @param {iterable} list The iterable producing the items to batch
 * @returns {iterable}
 */
function batch(batchsize, list) {

    batchsize = maximum(batchsize, MINIMUM_BATCHSIZE);

    return {
    
        [Symbol.iterator] : function* () {

            let batch = [];

            for(const item of list) {
        
                batch.push(item);
        
                if(batch.length < batchsize) continue;

                yield batch;
                
                batch = [];
            }
        
            batch.length && (yield batch);
        }
    }
}

module.exports = curry2(batch);