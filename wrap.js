'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

module.exports = require('./curry2')( NAMED_FUNCTIONS ? wrap_named : wrap )

/**
 * Return a function that passes *func* and its arguments to *wrapperfunc* and returns the result, allowing
 * wrapperfunc to pre-process *func*'s arguments and/or post-process *func*'s return value.
 * 
 * Both *func* and *wrapperfunc* must be functions. *Wrapperfunc* should have the signature 
 * `wrapperfunc(func, ...args)` and must invoke *func* itself.
 * 
 * `wrap()` is curried by default.
 * 
 * @module wrap
 * @param {function} func The function to wrap
 * @param {function} wrapperfunc 
 * @returns {function}
 * @example
 *     const wrap = require('functionish/wrap');
 * 
 *     function dosomething(arg1, arg2) { return 'dosomething was invoked' }
 * 
 *     function logwrapper(func, ...args) {
 * 
 *        const functionname = func.name;
 * 
 *        console.log(`${functionname} called with args:`, args);
 * 
 *        try {
 * 
 *           const result = func(...args);
 * 
 *           console.log(`${functionname} completed, return value:`, result);
 * 
 *           return result;
 * 
 *        } catch (error) {
 *           console.error(`${functionname} threw:`, error);
 *           throw error;
 *        }
 *     }
 * 
 *     const dosomething_logged = wrap(dosomething, logwrapper);
 * 
 *     dosomething_logged(42, 'foobar'); // runs logs the arguments, runs dosomething() and logs the result
 */
module.exports = require('./curry2')( NAMED_FUNCTIONS ? wrap_named : wrap );

function wrap(func, wrapperfunc) {

    function _wrappedfunction(...args) {
        return wrapperfunc(func, ...args);
    }

    return _wrappedfunction;
}

function wrap_named(func, wrapperfunc) {

    const wrappedname = `wrapped[${wrapperfunc.name}] ${func.name}`;

    const container = {
        [wrappedname] : function (...args) {
            return wrapperfunc(func, ...args);
        }
    }

    return container[wrappedname];
}