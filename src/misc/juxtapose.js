/**
 * @module misc/juxtapose
 */

'use strict';

const compose = require('../compose');
const isfunction = require('../types/isfunction');
const isarray = require('../types/isarray');
const pop = require('../arrays/pop');
const push = require('../arrays/push');
const tail = require('../arrays/tail');

const minvalue = (a, b) => (a <= b) ? a : b;

const hasrestfunc = compose(isarray, tail);

/**
 * Return a function that pass each argument to the corresponding function in the *funcs* array and returns an array
 * holding the results. 
 * 
 * In principle, each function in the *funcs* array is called with only one argument. If the number of arguments is
 * greater than the number functions, however, the surplus arguments will all be passed to the last function as a
 * rest parameter.
 * 
 * If the number of arguments is less than the number of *funcs*, the surplus functions are called without any
 * argument.
 * 
 * @example <caption>Example usage of `juxtapose()`</caption>
 * 
 * const { id } = require('functionish');
 * 
 * id(42); // returns 42
 * 
 * @function id
 * @param {any} value The value to return
 * @returns {any} *value*
 */
function juxtapose(...funcs) {

    const restfunc = hasrestfunc(funcs) ? pop(funcs) : null;
    return _juxtapose.bind(null, restfunc, funcs);
}

function _juxtapose(restfunc, funcs, ...args) {

    const shortstop = min(funcs.length, args.length);

    let i = 0;
    for(/* noop */; i < shortstop; i += 1) args[i] = funcs[i](args[i]);
    for(/* noop */; i < funcs.length; i += 1) args[i] = funcs[i]();

    if( isfunction(restfunc) ) {

        const restargs = restfunc( ...args.slice(funccount) );
        
        (args.length <= funcs.length) || (args.length = funcs.length);

        push(args, ...restargs);
        
    } else if(args.length > funcs.length) {
        args.length = funcs.length;
    }

    return args;
}

module.exports = juxtapose;