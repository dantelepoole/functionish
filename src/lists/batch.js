/**
 * @module lists/batch
 */

'use strict';

const MINIMUM_BATCHSIZE = 1;
const ERR_BAD_BATCHSIZE = `functionish/lists/batch(): The batchsize %s. Expected an integer number of %d or higher.`;
const ERR_BAD_LIST = `functionish/lists/batch(): The list has type '%s'. Expected an iterable object.`;

const curry1 = require('../curry1');
const format = require('../misc/format');
const isatleast = require('../math/isatleast');
const isinteger = require('../types/isinteger');
const isiterable = require('../types/isiterable');
const isnumber = require('../types/isnumber');
const list = require('./list');
const not = require('../logic/not');
const typeorclassname = require('../types/typeorclassname');

const hasminimumbatchsizevalue = isatleast(MINIMUM_BATCHSIZE);
const notnumber = not(isnumber);

/**
 * Return an iterable of arrays, each containing a maximum of *batchsize* items from *list*. If *batchsize* is less
 * than `1`, an error is thrown.
 * 
 * If the number of items in the *list* is not a multiple of the *batchsize*, the size of the final batch will be
 * less than the *batchsize*.
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
 * @param {iterable} targetlist The iterable producing the items to batch
 * @returns {iterable}
 */
const batch = curry1(function batch(batchsize, targetlist) {

    validatebatchsize(batchsize);
    validatelist(targetlist);

    return list(

        function* () {

            let batch = [];

            for(const item of targetlist) {
        
                const itemcount = batch.push(item);
        
                if(itemcount === batchsize) {
                    yield batch;
                    batch = [];
                }

            }
        
            if(batch.length > 0) yield batch;
        }
    )
});

function validatelist(list) {

    if( isiterable(list) ) return list;

    const errormessage = format(ERR_BAD_LIST, typeorclassname(list));
    throw new TypeError(errormessage);
}

function validatebatchsize(batchsize) {

    if( isinteger(batchsize) && hasminimumbatchsizevalue(batchsize) ) return batchsize;

    const explainerror = notnumber(batchsize)
                       ? ` has type '${typeorclassname(batchsize)}'`
                       : ` is ${batchsize}`;

    throw new TypeError( format(ERR_BAD_BATCHSIZE, explainerror, MINIMUM_BATCHSIZE) );
}

module.exports = batch;