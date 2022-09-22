/**
 * @module uniqfilter
 */

'use strict';

const bind = require('./bind');

/**
 * Return a filter function that accepts only unique values and rejects duplicates. The returned filter function 
 * can be passed to {@link module:predicate predicate()} to be used in a transducer, or can be used anywhere a filter
 * function is expected (e.g. {@link external:Array.prototype.filter Array.prototype.filter()}).
 * 
 * The returned filter function maintains a cache of all values passed through the filter. So you should never keep
 * a uniqfilter-instance around indefinitely, that would cause a memory leak. Instead, call `uniqfilter()` to create a
 * new filter each time you need one and let the garbage collector collect it as soon as you are finished with it.
 * 
 * Nevertheless, you can call the `clearcache()` method of the returned filter function to explicitly clear its cache
 * of all entries.
 * 
 * For the same reason, a uniqfilter-instance is not reusable, since on subsequent runs it will recognize the values
 * from earlier runs as being duplicates (unless you call `clearcache()` inbetween runs).
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
    
    uniqtransformation.clearcache = bind('clear', uniqitems);

    return uniqtransformation;
    
    function uniqtransformation(value) {
        return (uniqitems.size !== uniqitems.add(value).size);
    }
}