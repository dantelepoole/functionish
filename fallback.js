/**
 * @module fallback
 */

'use strict';

const ERR_BAD_FUNCTION = `FallbackError~The argument has type %s. Expected a function.`;
const FUNCTION_NONE = undefined;
const RESULT_NONE = undefined;

const fail = require('./fail');
const id = require('./id');
const isempty = require('./isempty');
const isfunction = require('./isfunction');
const iterate = require('./iterate');
const typeorclass = require('./typeorclass');

/**
 * @func fallback
 */
module.exports = function fallback(...funcs) {
    return isempty(funcs) ? id : funcs.reduceRight(fallbackreducer, FUNCTION_NONE);
}

function fallbackreducer(nextfunc, currentfunc) {

    isfunction(currentfunc) || fail(ERR_BAD_FUNCTION, typeorclass(currentfunc));

    return (nextfunc === FUNCTION_NONE) ? currentfunc
         : (...args) => (safeinvoke(currentfunc, args) ?? nextfunc(...args));
}

function safeinvoke(func, args) {

    try {
        return func(...args);
    } catch(error) {
        return RESULT_NONE;
    }
}