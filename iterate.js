'use strict';

const isarray = require('./lib/isarray');
const isiterable = require('./lib/isiterable');

const hasforeach = value => (typeof value?.forEach === 'function');
const iterateiterable = (func, iterable) => { for( const item of iterable ) func(item) };
const asobject = Object;

/**
 * Function variant of {@link external:Array.prototype.forEach Array.prototype.forEach()}, except that `iterate()` can
 * also iterate over objects.
 * 
 * If *list* is an array or an iterable, each item is passed to *func*. Otherwise, if it has a `forEach()` method, 
 * *func* is passed to that method. Otherwise, if *list* is an object, each property of the object is passed to *func*
 * as an array containing the property's key as its first element and the property's value as its second element.
 * 
 * *Important:* as per the ECMA specification {@link external:Array.prototype.forEach Array.prototype.forEach()} (which
 * `iterate()` relies on for Array *list* arguments) passes
 * additional arguments to the *func* function further to the list item being evaluated. This can lead to
 * unexpected behaviour in certain cases, especially if the *func* function is curried or accepts spread
 * and/or default parameters. In such cases you can apply the {@link module:unary unary()} function to ensure
 * the *predicate* function is always passed exactly one argument and no more.
 * 
 * `iterate()` is curried by default.
 * 
 * @module iterate
 * @see {@link external:Array.prototype.forEach Array.prototype.forEach()}
 * @param {function} func The function to apply to each item in *list*
 * @param {(array|iterable|object)} list The list of items to apply *func* to
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
 */
module.exports = require('./curry2')(

    function iterate(func, list) {

        isarray(list) ? iteratearray(func, list)
        : hasforeach(list) ? list.forEach(func)
        : isiterable(list) ? iterateiterable(func, list)
        : iterateobject(func, asobject(list));

    }
)

function iteratearray(func, array) {

    let index = 0;

    while(index < array.length) {
        func( array[index] )
        index += 1;
    }
}

function iterateobject(func, object) {
    Object.entries(object).forEach(entry => func(entry))
}