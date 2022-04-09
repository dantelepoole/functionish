/**
 * Return an array of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
 * a batch size of `1` will be used.
 * 
 * If *list* is neither an array nor an iterable, it is assumed to be the only item and will be returned as the only
 * item in a single-batch array.
 * 
 * `batch()` is curried by default.
 * 
 * @module batch
 * @param {number} batchsize The maximum number of items in each batch
 * @param {(any[]|iterable|any)} list The list of items to batch
 * @returns {any[]}
 * @example
 * 
 * const batch = require('functionish/batch');
 * 
 * const list = [1,2,3,4,5,6,7,8,9,10,11,12];
 *  
 * batch(5, list); // returns [ [1,2,3,4,5], [6,7,8,9,10], [11,12] ]
 * 
 */

'use strict';

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');

const maximumvalue = Math.max;
const toarray = item => [item];

module.exports = require('./curry2')(
    
    function batch(batchsize, list) {

        batchsize = maximumvalue(batchsize, 1);

        return isarray(list) ? arraybatch(batchsize, list)
            : isiterable(list) ? iterablebatch(batchsize, iterable)
            : [ [list] ];
    }
)

function arraybatch(batchsize, list) {

    if( batchsize === 1 ) return list.map(toarray);

    const batches = [];
    let index = 0;

    // Oh yeah, I'm looping baby.....and it feels goooooooooooooooooooooo
    while( index < list.length ) {
        
        const nextbatch = list.slice(index, index + batchsize);

        batches.push(nextbatch);

        index += batchsize;
    }

    return batches;
}

function iterablebatch(batchsize, iterable) {

    const batches = [];
    const nextbatch = [];

    for( const item in iterable ) {

        nextbatch.push(item);

        if( nextbatch.length === batchsize ) {
            batches.push(nextbatch);
            nextbatch.length === 0
        }
    }

    if( nextbatch.length > 0 ) batches.push(nextbatch);

    return batches;
}