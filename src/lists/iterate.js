/**
 * @module lists/iterate
 */

'use strict';

const ERR_BAD_LIST = `functionish/lists/iterate(): The list has type %s. Expected an iterable object.`;

const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const issingleton = require('../arrays/issingleton');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const validatelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
)

/**
 * Pass each item in *sourcelist* to *iteratorfunc* in order and return *sourcelist* itself. 
 * 
 * The *iteratorfunc* is actually called with two parameters: the current item of *sourcelist* and an `abort()` function
 * that *iteratorfunc* can call to abort further iteration. In that event, the argument passed to the `abort()` 
 * unction is returned instead of the *sourcelist* itself.
 * 
 * `iterate()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `iterate()`</caption>
 *     
 * const { iterate } = require('functionish/lists');
 * 
 * iterate(console.log, [1,2,3]);
 * // prints:
 * //   1
 * //   2
 * //   3
 *     
 * @function iterate
 * @see {@link module:misc/resolve resolve()}
 * @param {(function|string)} iteratorfunc The function to apply to each item in *list*
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
function iterate(iteratorfunc, sourcelist) {

    if( issingleton(arguments) ) return iterate.bind(null, iteratorfunc);
    
    validatelist(sourcelist);
    
    let result = sourcelist;
    const abort = data => (result = data);

    for(const item of sourcelist) {
        
        iteratorfunc(item, abort);

        if(result !== sourcelist) break;
    }

    return result;
}

module.exports = iterate;