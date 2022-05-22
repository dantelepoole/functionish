/**
 * @module difference
 */

'use strict';

const bind = require('./bind');
const filteriterable = require('./filteriterable');
const isarray = require('./isarray');
const isstring = require('./isstring');
const not = require('./not');
const uniq = require('./uniq');

/**
 * Return an iterable producing only those items from *list1* that are not present in *list2*, but without duplicates.
 * If *iterable1* is an array, an array is returned instead.
 * 
 * `difference()` is curried by default.
 * 
 * @func difference
 * @param {iterable} iterable1 The first iterable
 * @param {iterable} iterable2 The second iterable
 * @returns {iterable}
 */

module.exports = require('./curry2') (

    function difference(iterable1, iterable2) {

        const iterable2filter = iterablefilterfactory(iterable2);
        const differencefilter = filteriterable(iterable2filter, iterable1);

        return uniq(differencefilter);
        
    }
)

function iterablefilterfactory(iterable) {

    return isarray(iterable) || isstring(iterable) ? not( bind('includes', iterable) )
         : not( bind('has', new Set(iterable)) );
}