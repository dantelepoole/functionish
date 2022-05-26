/**
 * @module flatten 
 */
'use strict';

function isiterable(x) {
    // return (typeof x !== 'string' && typeof x?.[Symbol.iterator] === 'function');
    return (typeof x?.[Symbol.iterator] === 'function');
}

/**
 * Function variant of {@link external:Array.prototype.flat Array.prototype.flat()}. Pass *depth* to *flattenable*'s
 * `flatten()`-method and return the result. If *flattenable* has no `flat()` method, assume it is iterable and return
 * an iterable that recursively flattens flattenables's items to the specified *depth*.
 * 
 * `flatten()` is curried by default.
 * 
 * @func flatten
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} depth The number of dimensions to flatten *flattenable*
 * @param {(flattenable|iterable)} flattenable An object with a `flat()` method or an iterable object
 * @returns {any}
 */
module.exports = function flatten(iterable, depth=1) {

    return {
        [Symbol.iterator] : function* () {

            const shouldrecurse = (depth > 0);
        
            for(const item of iterable) {
        
                console.log(`flatten[${depth}]`, item);

                if( shouldrecurse && isiterable(item) ) {
        
                    for( const subitem of flatten(item, depth-1) ) {
                        console.log(`\t`, subitem)
                        yield subitem;
                    }

                    continue;
                }
        
                yield item;
            }
        }
        
    }
}