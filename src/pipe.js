/**
 * @module pipe
 */

'use strict';

const ERR_MISSING_FUNCTIONS = `functionish/pipe(): The targetfuncs argument array is empty. Expected at least one function.`;

const head = require('./arrays/head');
const id = require('./id');

const largepipecomposer = funcs => runpipe.bind(null, funcs);
const raisemissingfunctionserror = () => { throw new TypeError(ERR_MISSING_FUNCTIONS); }

const pipecomposermap = Object.freeze([
    raisemissingfunctionserror,
    head,
    ([f1,f2]) => (...args) => f2(f1(...args)),
    ([f1,f2,f3]) => (...args) => f3(f2(f1(...args))),
    ([f1,f2,f3,f4]) => (...args) => f4(f3(f2(f1(...args)))),
    ([f1,f2,f3,f4,f5]) => (...args) => f5(f4(f3(f2(f1(...args))))),
]);

/**
 * Return a function that runs each function in the *targetfuncs* array in order (i.e. from first
 * to last) passing the previous function's return value to the following function each time.
 * 
 * If the *targetfuncs* array is empty an error is thrown.
 * 
 * @example <caption>Example usage of `pipe()`</caption>
 * 
 * const { pipe } = require('functionish');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const calculate = pipe(negate, double, increment);
 * 
 * calculate(42); // returns `-83`
 * 
 * @function pipe
 * @see {@link module:compose compose()}
 * @param {...function} targetfuncs One or more functions to pipe
 * @returns {function}
 */
function pipe(...targetfuncs) {

    const pipecomposer = (pipecomposermap[targetfuncs.length] ?? largepipecomposer);

    return pipecomposer(targetfuncs);
}

function runpipe(funcs, ...args) {

    let result = funcs[0](...args);

    for(let i = 1; i < funcs.length; i += 1) result = funcs[i](result);

    return result;
}

module.exports = pipe;