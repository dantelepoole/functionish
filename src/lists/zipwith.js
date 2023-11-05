/**
 * @module lists/zipwith
 */

'use strict';

const curry = require('../curry');
const map = require('./map');
const uniadic = require('../uniadic');
const zip = require('./zip');


/**
 * to do
 * 
 * @example <caption>Example usage of `zipwith()`</caption>
 *     
 * to do
 * 
 * @function zipwith
 * @see {@link module:lists/zip zip()}
 * @param {function} zipfunc The function to apply to the items from *list1* and *list2*
 * @param {iterable} list1 The iterable to zip with the items from *list2*
 * @param {iterable} list2 The iterable to zip the items from *list1* with
 * @returns {iterable}
 */
function zipwith(mode, zipfunc, list1, list2) {

    const mapfunc = map( uniadic(zipfunc) );
    const ziplist = zip(mode, list1, list2);

    return map(mapfunc, ziplist)
}

module.exports = curry(2, zipwith);