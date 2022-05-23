/**
 * @module iterate
 */

'use strict';

const unary = require('./unary');

/**
 * Functional variant of {@link external:Array.prototype.forEach Array.prototype.forEach()}. If *iterable* has a
 * `forEach()` method, invoke it with *func*. Otherwise, assume *iterable* is an iterable object and invoke *func* with
 * each item that *iterable* produces.
 * 
 * *Important:* the *func* function is coerced to unary arity before it is passed to *list*'s `forEach()` method. This
 * means that *func* will only ever receive a single argument (the item being iterated), regardless of how many
 * arguments *list*'s `forEach()` method actually passes.
 * 
 * `iterate()` is curried by default.
 * 
 * @example
 *     
 * const iterate = require('functionish/iterate');
 * 
 * const printdouble = x => console.log( (x*2) );
 * 
 * iterate(printdouble, [1,2,3]); // prints `2`, `4` and `6`
 *     
 * const printdoubleproperty = entry => console.log( entry[0] + ': ' + (entry[1] * 2) );
 * const obj = { a:42, b:30 }
 * 
 * iterate(printdoubleproperty, obj); // prints `a:84` and `b:60`
 * 
 * @func iterate
 * @see {@link external:Array.prototype.forEach Array.prototype.forEach()}
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} list An iterable object producing items to apply *func* to
 */
module.exports = require('./curry2')(

    function iterate(func, iterable) {

        return (typeof iterable?.forEach === 'function') ? iterable.forEach( unary(func) )
             : iterateiterable(func, iterable);
    }
)

function iterateiterable(func, iterable) {
    for( const item of iterable ) func(item);
}