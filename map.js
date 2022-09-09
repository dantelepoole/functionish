/**
 * @module map
 */

'use strict';

const ERR_BAD_MAPPABLE = `MapError~The mappable has type %s. Expected an object with a map() method or an iterable object.`;

const unary = require('./unary');

const fail = require('./fail');
const isiterable = require('./isiterable');
const resolvefunction = require('./resolvefunction');
const typeorclass = require('./typeorclass');

const ismappable = obj => (typeof obj?.map === 'function');

/**
 * Pass the *map* function to the `map()` method of *mappable* and return the result. If *mappable* has
 * no such method but it is iterable, return an iterable object that applies *mapfunc* to each item produced by
 * *mappable*.
 * 
 * *Important:* the *mapfunc* function is coerced to unary arity before it is passed to *mappable*'s `map()`
 * method (if it exists). This means that *mapfunc* will only ever receive a single argument (the item being
 * mapped), regardless of how many arguments *mappable*'s `map()` method actually passes.
 * 
 * `map()` is curried by default with binary arity.
 * 
 * @example
 * 
 * const map = require('functionish/map');
 * 
 * const double = x => (x*2);
 * 
 * map(double, [1,2,3]); // returns [2,4,6]
 *     
 * @func map
 * @see {@link module:unary unary()}
 * @param {function} func The function to apply to each item in *list*
 * @param {(mappable|iterable)} list An object with a `map()` method or an iterable object
 * @returns {any}
 */

module.exports = require('./curry2')(

    function map(mapfunc, mappable) {
        
        mapfunc = resolvefunction(mapfunc);

        return ismappable(mappable) ? mappable.map( unary(mapfunc) )
             : isiterable(mappable) ? maplist(mapfunc, mappable)
             : fail(ERR_BAD_MAPPABLE, typeorclass(mappable));
    }
)

function maplist(mapfunc, list) {

    return {

        [Symbol.iterator] : function* () {
            for( const item of list ) yield mapfunc(item);
        }
    }
}