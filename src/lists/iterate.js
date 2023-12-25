/**
 * @module lists/iterate
 */

'use strict';

const ERR_BAD_FUNC = `functionish/lists/iterate(): The function has type %s. Expected a function.`;
const ERR_BAD_LIST = `functionish/lists/iterate(): The list has type %s. Expected an iterable object.`;

const curry1 = require('../curry1');
const exception = require('../errors/exception');
const isfunction = require('../types/isfunction');
const isiterable = require('../types/isiterable');
const typeorclassname = require('../types/typeorclassname');
const validator = require('../errors/validator');

const validatefunc = validator(
    exception('TypeError', ERR_BAD_FUNC, typeorclassname),
    isfunction
)

const validatelist = validator(
    exception('TypeError', ERR_BAD_LIST, typeorclassname),
    isiterable
)

/**
 * Pass each item in *sourcelist* to *func* in order and return *sourcelist* itself. 
 * 
 * The *func* is actually called with two parameters: the current item of *sourcelist* and an `abort()` function that
 * *func* can call abort iterating any further. In that event, the argument passed to the `abort()` function is returned
 * instead of the *sourcelist* itself.
 * 
 * `iterate()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `iterate()`</caption>
 *     
 * const { iterate } = require('functionish/lists');
 * 
 * 
 *     
 * @function iterate
 * @param {function} func The function to apply to each item in *list*
 * @param {iterable} sourcelist An iterable object
 * @returns {iterable} 
 */
const iterate = curry1(function iterate(func, sourcelist) {

    validatefunc(func);
    validatelist(sourcelist);
    
    let result = sourcelist;
    const abort = data => (result = data);

    for(const item of sourcelist) {
        
        func(item, abort);

        if(result !== sourcelist) break;
    }

    return result;
})

module.exports = iterate;