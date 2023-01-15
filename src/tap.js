/**
 * @module tap
 */

'use strict';

const TYPE_STRING = 'string';

const callorcurry = require('../lib/callorcurry');
const curryarity = require('./curryarity');
const iscurried = require('./iscurried');
const loadfunction = require('./loadfunction');

/**
 * Return a function that passes its arguments to *tappedfunc* and returns its own first
 * argument. If the optional *nextfunc* is passed, instead of returning the first argument,
 * it calls *nextfunc* and returns the result.
 * 
 * Currying is preserved. If *primaryfunc* has been curried (i.e. it has been passed to {@link module:curry curry()}), the
 * returned function will be curried with the same arity. If no *primaryfunc* is passed and
 * *tappedfunc* has been curried, the returned function will be curried with *tappedfunc*'s
 * arity.
 * 
 * @example <caption>Example usage of `tap()`</caption>
 * 
 * const { tap } = require('functionish');
 * 
 * const log = tap(console.log);
 * 
 * log(42); // prints 42 to the screen and returns 42
 * 
 * @example <caption>Example usage of `tap()` with a primary function argument</caption>
 * 
 * const { tap } = require('tap');
 * 
 * const double = x => (x*2);
 * const loggeddouble = tap(console.log, double);
 * 
 * loggeddouble(42); // prints 42 to the screen and returns 84
 * 
 * @param {function} tappedfunc The function to tap
 * @param {function} [primaryfunc] The function to invoke after tapping *tappedfunc*
 * @returns {function}
 */
function tap(tappedfunc, primaryfunc) {

    return (typeof tappedfunc === TYPE_STRING) ? tap( loadfunction(tappedfunc), primaryfunc )
         : primaryfunc ? tapcompose(tappedfunc, primaryfunc)
         : tapsimple(tappedfunc);
}

function tapsimple(tappedfunc) {

    const _tap = (...args) => (tappedfunc(...args), args[0]);

    return iscurried(tappedfunc)
         ? callorcurry( curryarity(tappedfunc), _tap )
         : _tap;
}

function tapcompose(tappedfunc, nextfunc) {

    const _tap = (...args) => (tappedfunc(...args), nextfunc(...args));

    return iscurried(nextfunc)
         ? callorcurry( curryarity(nextfunc), _tap )
         : _tap;
}

module.exports = tap;