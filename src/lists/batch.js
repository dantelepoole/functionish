/**
 * @module lists/batch
 */

'use strict';

const MINIMUM_BATCHSIZE = 1;

const curry = require('../curry');

const maximum = Math.max;

/**
 * Return an iterable of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used.
 * 
 * `batch()` is curried by default with unary arity.
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

    return batchiterable(batchsize, list);
}

function batchiterable(batchsize, list) {

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

module.exports = curry(1, batch);