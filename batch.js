/**
 * @module batch
 */

'use strict';

const isarray = require('./isarray');

const maximumvalue = Math.max;

/**
 * Return an iterable of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used. If *iterable* is an array itself, an array is returned.
 * 
 * If *batchsize* is negative, an empty array is returned.
 * 
 * `batch()` is curried by default.
 * 
 * @example
 * 
 * const batch = require('functionish/batch');
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

module.exports = require('./curry2')(
    
    function batch(batchsize, iterable) {

        batchsize = maximumvalue( parseInt(batchsize), 1);

        return isarray(iterable) ? batcharray(batchsize, iterable) : batchiterable(batchsize, iterable);
    }
)

function batchiterable(batchsize, iterable) {

    return {
        
        [Symbol.iterator] : function* () {

            let batch = [];

            for( const item of iterable ) {
        
                batch.push(item);
        
                if( batch.length >= batchsize ) {
                    yield batch;
                    batch = [];
                }
            }
        
            if( batch.length > 0 ) yield batch;
        }
    }
}

function batcharray(batchsize, list) {

    
    if( list.length === 0 ) return [ [] ];
    
    const batches = [];
    let index = 0;

    while( index < list.length ) {
        
        const nextbatch = list.slice(index, index + batchsize);

        batches.push(nextbatch);

        index += batchsize;
    }

    return batches;
}
