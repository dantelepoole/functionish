/**
 * @module compose
 */

'use strict';

const ERR_BAD_FUNCTION = `ComposeError~The argument has type %s. Expected a function.`;
const COMPOSE_NONE = undefined;

const fail = require('./fail');
const id = require('./id');
const isempty = require('./isempty');
const isfunction = require('./isfunction');
const typeorclass = require('./typeorclass');

/**
 * Compose is similar to {@link module:pipe pipe()} except that it invokes *funcs* in reverse order, i.e.
 * from right to left. See {@link module:pipe pipe()} for further details.
 * 
 * @example
 * 
 * const compose = require('functionish/compose');
 * 
 * const increment = x => (x+1);
 * const double = x => (x*2);
 * const negate = x => -x;
 * 
 * const allthree = compose(negate, double, increment);
 * 
 * allthree(42); // returns `-86`
 * 
 * @func compose
 * @see {@link module:pipe pipe()}
 * @param  {...function} funcs One or more functions to compose to a single function
 * @returns {function}
 */

module.exports = function compose(...funcs) {
    return isempty(funcs) ? id : funcs.reduce(composereducer, COMPOSE_NONE);
}

function composereducer(currentfunc, nextfunc) {

    isfunction(nextfunc) || fail(ERR_BAD_FUNCTION, typeorclass(nextfunc));

    return (currentfunc === COMPOSE_NONE) ? nextfunc
         : (...args) => currentfunc( nextfunc(...args) );
}