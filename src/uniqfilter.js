/**
 * @module uniqfilter
 */

'use strict';

/**
 * Return a filter function that accepts only unique values and rejects duplicates. The returned filter function 
 * can be passed to {@link module:predicate predicate()} to be used in a transducer, or can be used anywhere a filter
 * function is expected (e.g. {@link external:Array.prototype.filter Array.prototype.filter()}).
 * 
 * The returned filter function maintains a cache of all values passed through the filter. You can call the
 * `clearcache()` method of the returned filter function to explicitly clear its cache.
 * 
 * @example
 * 
 * const uniqfilter = require('functionish/uniqfilter');
 * 
 * const filter = uniqfilter();
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter(filter); // returns [1,2,3,4,5]
 * 
 * filter.clearcache();
 * 
 * @func uniqfilter
 * @see {@link module:predicate predicate()}
 * @returns {function}
 */
module.exports = function uniqfilter() {

    const uniqitems = new Set();
    
    function uniqtransformation(value) {
        return (uniqitems.size !== uniqitems.add(value).size);
    }

    uniqtransformation.clearcache = uniqitems.clear.bind(uniqitems);

    return uniqtransformation;
}