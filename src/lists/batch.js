/**
 * @module lists/batch
 */

'use strict';

const MINIMUM_BATCHSIZE = 1;

const maximum = Math.max;

/**
 * Return an iterable of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used.
 * 
 * @example
 * 
 * const batch = require('functionish/lists/batch');
 * 
 * const list = [1,2,3,4,5,6,7,8,9,10,11,12];
 *  
 * batch(5, list); // returns [ [1,2,3,4,5], [6,7,8,9,10], [11,12] ]
 * 
 * @func batch
 * @param {number} batchsize The maximum number of items in each batch
 * @param {iterable} iterable The iterable producing the items to batch
 * @returns {iterable}
 */

module.exports = function batch(batchsize, iterable) {

    batchsize = maximum(batchsize, MINIMUM_BATCHSIZE);

    return {
    
        [Symbol.iterator] : function* () {

            let batch = [];

            for(const item of iterable) {
        
                batch.push(item);
        
                if(batch.length < batchsize) continue;

                yield batch;
                
                batch = [];
            }
        
            batch.length && (yield batch);
        }
    }
}
