/**
 * @module juxtapose
 */

'use strict';

const ERR_BAD_ARGSLIST = `JuxtaposeError~The args-list has type %s. Expected an iterable object.`;
const ERR_BAD_FUNCTIONS = `JuxtaposeError~The funcs argument has type %s. Expect an array of functions.`;
const ERR_BAD_FUNCTION = `JuxtaposeError~The function at index %d has type %s. Expected function.`;

const fail = require('./fail');
const notarray = require('./notarray');
const notfunction = require('./notfunction');
const notiterable = require('./notiterable');
const typeorclass = require('./typeorclass');

/**
 * Return an array containing the results of passing the *args* to each function in *funcs*.
 * 
 * @func juxtapose
 * @param {function[]} funcs The functions to invoke
 * @param {iterable} args An iterable object producing the arguments to pass to each function.
 * @returns {any[]}
 */
module.exports = require('./curry2')(juxtapose);

function juxtapose(funcs, args) {

    notarray(funcs) && fail(ERR_BAD_FUNCTIONS, typeorclass(args));
    validatefunctions(funcs);
    notiterable(args) && fail(ERR_BAD_ARGSLIST, typeorclass(args));

    args = Array.from(args);

    return funcs.map(
        func => func.call(this, ...args)
    )
}

function validatefunctions(funcs) {
    funcs.forEach( functionvalidatorfactory() );
}

function functionvalidatorfactory() {

    let index = 0;

    return func => {
        notfunction(func) && fail(ERR_BAD_FUNCTION, index, typeorclass(func));
        index += 1;
    }
}