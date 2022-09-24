/**
 * @module flatten 
 */

'use strict';

const DEFAULT_DEPTH = 1;

const flatlist = require('./flatlist');
const isfunction = require('./isfunction');

const isflattenable = obj => isfunction(obj?.flat);

/**
 * Pass the *depth* to *flattenable*'s `flat()` method and return the result. If *flattenable* has no such method but
 * is iterable, return an iterable that flattens the *flattenable*'s items to the specified *depth*.
 * 
 * Pass `Infinity` to flatten the flattenable completely.
 * 
 * `flat()` is curried by default with binary arity.
 * 
 * @func flat
 * @see {@link external:Array.prototype.flat Array.prototype.flat()}
 * @param {number} depth The maximum recursion level for flattening the *flattenable*
 * @param {(flattenable|iterable)} flattenable An object with a `flat()` method or an iterable object
 * @returns {any}
 */
module.exports = require('./curry2')(

    function flat(depth, flattenable) {

        if(arguments.length === 1) [depth, flattenable] = DEFAULT_DEPTH, depth;
        
        return isflattenable(flattenable) ? flattenable.flat(depth) : flatlist(depth, flattenable)
    }
)