/**
 * @module batch
 */

'use strict';

const lift = require('./lift');

const maximumvalue = Math.max;

/**
 * Return an array of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used.
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
 * @param {any[]} list The list of items to batch
 * @returns {any[][]}
 */

module.exports = require('./curry2')(
    
    function batch(batchsize, list) {

        batchsize = maximumvalue( parseInt(batchsize), 1);

        return arraybatch(batchsize, list);
    }
)

function arraybatch(batchsize, list) {

    if( batchsize === 1 ) return list.map(lift);

    const batches = [];
    const listlength = (list.length ?? 0);

    if( listlength === 0 ) return [ [] ];
    
    let index = 0;

    while( index < listlength ) {
        
        const nextbatch = list.slice(index, index + batchsize);

        batches.push(nextbatch);

        index += batchsize;
    }

    return batches;
}
