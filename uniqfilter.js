/**
 * @module uniqfilter
 */

'use strict';

/**
 * Return a filter function that accepts only unique values and rejects duplicates.
 * 
 * The returned filter function maintains a cache of all values passed through the filter. So you should never keep
 * a uniqfilter-instance around indefinitely, that would cause a memory leak. Instead, call `uniqfilter()` to create a
 * new filter each time you need one and let the garbage collector collect it as soon as you are finished with it.
 * 
 * Nevertheless, you can call the `reset()` method of the returned filter function to explicitly clear its cache
 * of all entries.
 * 
 * For the same reason, a uniqfilter-instance is not reusable, since on subsequent runs it will recognize the values
 * from earlier runs as being duplicates (unless you call `reset()` inbetween runs).
 * 
 * @example
 * 
 * const uniqfilter = require('functionish/uniqfilter');
 * 
 * const filter = uniqfilter();
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter(filter); // returns [1,2,3,4,5]
 * 
 * filter.reset();
 * 
 * @func uniqfilter
 * @returns {function}
 */
module.exports = function uniqfilter() {

    const duplicatevalues = new Set();

    const uniqfilter = value => (duplicatevalues.size !== duplicatevalues.add(value).size);
    uniqfilter.reset = duplicatevalues.clear.bind(duplicatevalues);

    return uniqfilter;
}