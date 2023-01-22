/**
 * @module misc/dedupfilter
 */

'use strict';

/**
 * Return a filter function that accepts only unique values and rejects duplicates.
 * 
 * The returned filter function maintains a cache of all values passed through the filter. So you should never keep
 * a dedupfilter-instance around indefinitely, that would cause a memory leak. Instead, call `dedupfilter()` to create a
 * new filter each time you need one and let the garbage collector collect it as soon as you are finished with it.
 * 
 * For the same reason, a dedupfilter-instance is not reusable, since on subsequent runs it will recognize the values
 * from earlier runs as being duplicates.
 * 
 * @example <caption>Example usage of `dedupfilter()`</caption>
 * 
 * const { dedupfilter } = require('functionish/misc');
 * 
 * [1,2,2,3,3,3,4,4,4,4,5,5,5,5,5].filter( dedupfilter() ); // returns [1,2,3,4,5]
 * 
 * @function dedupfilter
 * @returns {function}
 */
function dedupfilter() {

    const dedup = new Set();

    return value => (dedup.size !== dedup.add(value).size);
}

module.exports = dedupfilter;