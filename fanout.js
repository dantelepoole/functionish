/**
 * @module fanout
 */

'use strict';

const ERR_BAD_FUNCTION = `FanoutError~The argument has type %s. Expected a function.`;

const ERROR_NONE = undefined;
const RESULT_NONE = undefined;

const fail = require('./fail');
const isfunction = require('./isfunction');
const iterate = require('./iterate');
const partial = require('./partial');
const typeorclass = require('./typeorclass');

const validatefunction = func => isfunction(func) || fail(ERR_BAD_FUNCTION, typeorclass(func));
const validatefunctions = iterate(validatefunction);

/**
 * Return a function that passes its arguments to each function in *funcs* and returns an array
 * containing the results.
 * 
 * Each item in the result array is `[returnvalue, error]` tuple. If the corresponding function completed
 * successfully, the *returnvalue* will be its return vaule and the *error* will be `undefined`. If the
 * corresponding function threw, the *returnvalue* will be `undefined` and the *error* will be the thrown
 * value.
 * 
 * @func fanout
 * @param {...function} funcs The functions to all
 * @returns {any[][]} An array of result tuples
 */
module.exports = function fanout(...funcs) {

    validatefunctions(funcs);

    return (...args) => funcs.map( partial(invoke, args) );
}

function invoke(args, func) {

    try {
        return [ func(...args), ERROR_NONE ]
    } catch(error) {
        return [ RESULT_NONE, error ];
    }
}
