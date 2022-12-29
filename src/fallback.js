/**
 * @module fallback
 */

'use strict';

const FUNCTION_NONE = undefined;
const RESULT_NONE = undefined;

const id = require('./id');

const fallbackreducer = (next,f) => next ? (...args) => (safeinvoke(f, args) ?? next(...args)) : f;

/**
 * @func fallback
 */
module.exports = function fallback(...funcs) {
    return funcs.reduceRight(fallbackreducer, FUNCTION_NONE) ?? id;
}

function safeinvoke(f, args) {

    try {
        return f(...args);
    } catch(error) {
        return RESULT_NONE;
    }
}