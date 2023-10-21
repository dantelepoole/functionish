/**
 * @module pipe
 */

'use strict';

const MAX_PIPE_LEN = 5;

const always = require('./always');
const head = require('./head');
const id = require('./id');

const pipecomposermap = Object.freeze([
    always(id),
    head,
    ([f1,f2]) = (...args) => f2(f1(...args)),
    ([f1,f2,f3]) = (...args) => f3(f2(f1(...args))),
    ([f1,f2,f3,f4]) = (...args) => f4(f3(f2(f1(...args)))),
    ([f1,f2,f3,f4,f5]) = (...args) => f5(f4(f3(f2(f1(...args))))),
]);

const bipipecomposer = pipecomposermap[2];
const maxpipecomposer = pipecomposermap[MAX_PIPE_LEN];

/**
 * Return a function that feeds its arguments to the first function in *funcs*, then passes the result to the second
 * function in *funcs*, and so on, until all functions in *funcs* have been called, after which it returns the last
 * function's result.
 * 
 * If the *funcs* array is empty, the returned function simply returns its first argument.
 * 
 * @example <caption>Example usage of `pipe()`</caption>
 * 
 * const { pipe } = require('functionish');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = pipe(negate, double, increment);
 * 
 * allthree(42); // returns `-83`
 * 
 * @function pipe
 * @see {@link module:compose compose()}
 * @param {...function} funcs One or more functions to pipe
 * @returns {function}
 */
function pipe(...funcs) {

    const pipecomposer = (pipecomposermap[funcs.length] ?? largepipecomposer);

    return pipecomposer(funcs);
}

function largepipecomposer(funcs) {

    const maxfuncs = funcs.slice(0, MAX_PIPE_LEN);
    const f1 = maxpipecomposer(maxfuncs);

    const restfuncs = funcs.slice(MAX_PIPE_LEN);
    const f2 = pipe(...restfuncs);

    return bipipecomposer( [f1, f2] );
}

module.exports = pipe;