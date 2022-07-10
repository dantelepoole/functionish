/**
 * @module uniqfilter
 */

'use strict';

/**
 * Return a filter function that accepts only unique values and rejects duplicates. The returned filter function 
 * can be passed to {@link module:predicate predicate()} to be used in a transducer.
 * 
 * @func uniqfilter
 * @see {@link module:predicate predicate()}
 * @returns {function}
 */
module.exports = function uniqfilter() {

    const uniqitems = new Set();
    
    return function uniqtransformation(value) {
        return (uniqitems.size !== uniqitems.add(value).size);
    }
}