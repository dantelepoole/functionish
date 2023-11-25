/**
 * @module tryfinally
 */

'use strict';

const ERR_BAD_FINALLYHANDLER = `functionish/tryfinally(): The finally handler has type '%s'. Expected a function.`;
const ERR_BAD_TARGETFUNCTION = `functionish/tryfinally(): The target function has type '%s'. Expected a function.`;

const curry1 = require('./curry1');
const format = require('./misc/format');
const isfunction = require('./types/isfunction');
const nothrow = require('./nothrow');
const raise = require('./errors/raise');
const typeorclassname = require('./types/typeorclassname');

/**
 * Return a function that passes its arguments *targetfunc* and always calls *onfinally* with the result.
 * 
 * *onfinally()* must be a function. It will always be passed an error argument followed by a data argument. If
 * *targetfunc* throws, the error argument will hold the thrown value and the data argument will be `undefined`. If
 * *targetfunc* returns, the error argument will be `undefined` and the data argument will hold *targetfunc*'s return
 * value.
 * 
 * If *onfinally()* returns the same error value that *targetfunc* threw, the error value will be rethrown. Otherwise,
 * *onfinally()*'s return value is passed directly back by to the caller.
 * 
 * `tryfinally()` is curried by default with unary arity.
 * 
 * @example <caption>Example usage of `tryfinally()`</caption>
 * 
 * const { tryfinally } = require('functionish');
 * 
 * const onfinally = (error,data) = error ? (console.error(error), NaN) : data;
 * const baddouble = tryfinally(onfinally, () => { throw new Error('something went wrong') });
 * const gooddouble = tryfinally(onfinally, x => 2*x);
 * 
 * baddouble(42); // prints an error to stderr and returns NaN
 * gooddouble(42)); // returns 84
 * 
 * @function tryfinally
 * @param {function} onfinally The finally handler function
 * @param {function} targetfunc The function to run
 * @returns {function}
 */
const tryfinally = curry1(function tryfinally(onfinally, targetfunc) {

    validatefinallyhandler(onfinally);
    validatetargetfunction(targetfunc);

    targetfunc = nothrow(targetfunc);

    return _tryfinally.bind(null, onfinally, targetfunc);
})

function _tryfinally(finallyhandler, targetfunc, ...args) {

    const [data, error] = targetfunc(...args);

    const result = finallyhandler(error, data);

    result && (result === error) && raise(error);

    return result;
}

function validatefinallyhandler(onfinally) {

    if( isfunction(onfinally) ) return onfinally;

    const errormessage = format(ERR_BAD_FINALLYHANDLER, typeorclassname(onfinally));
    throw new TypeError(errormessage);
}

function validatetargetfunction(targetfunc) {

    if( isfunction(targetfunc) ) return targetfunc;

    const errormessage = format(ERR_BAD_TARGETFUNCTION, typeorclassname(targetfunc));
    throw new TypeError(errormessage);
}

module.exports = tryfinally;