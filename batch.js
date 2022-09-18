/**
 * @module batch
 */

'use strict';

const ERR_BAD_ITERABLE = `BatchError~The iterable has type %s. Expected an iterable object.`;
const ERR_BAD_BATCHSIZE = `BatchError~The batchsize has type %s. Expected a number.`;
const MINIMUM_BATCHSIZE = 1;

const maximum = Math.max;

const fail = require('./fail');
const isnan = require('./isnan');
const notiterable = require('./notiterable');
const notnumber = require('./notnumber');
const typeorclass = require('./typeorclass');

const getbatchsizetype = batchsize => isnan(batchsize) ? 'NaN' : typeorclass(batchsize);
/**
 * Return an iterable of arrays, each containing a maximum of *batch* items from *list*. If *batch* is less than `1`,
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
 * @param {iterable} iterable The iterable producing the items to batch
 * @returns {iterable}
 */

module.exports = require('./curry2')(
    
    function batch(batchsize, iterable) {

        notiterable(iterable) && fail(ERR_BAD_ITERABLE, typeorclass(iterable));
        notnumber(batchsize) && fail(ERR_BAD_BATCHSIZE, getbatchsizetype(batchsize));

        batchsize = maximum(batchsize, MINIMUM_BATCHSIZE);

        return {
        
            [Symbol.iterator] : function* () {
    
                let batch = [];
    
                for( const item of iterable ) {
            
                    batch.push(item);
            
                    if(batch.length >= batchsize) {
                        yield batch;
                        batch = [];
                    }
                }
            
                if(batch.length > 0) yield batch;
            }
        }
    }
)
