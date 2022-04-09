'use strict';

const NAMED_FUNCTIONS = require('./config').NAMED_FUNCTIONS;

module.exports = NAMED_FUNCTIONS ? tap_named : tap;

/**
 * Return a function that passes its arguments (preceded by any *preboundargs* passed to `tap()`) but returns its own
 * first argument (ignoring *func*'s return value).
 * 
 * @module tap
 * @param {function} func The function to call
 * @param  {...any} preboundargs The arguments to pre-bind to *func*
 * @returns {any} The first argument passed to the returned function
 */
function tap(func, ...preboundargs) {

    function tappedfunction(...args) {
        func(...preboundargs, ...args);
        return args[0];
    }

    return tappedfunction;
}

function tap_named(func) {

    const tappedname = `tapped ${func.name}`;

    const container = {
        [tappedname] : function (...args) {
            func(...args);
            return args[0];
        }
    }

    return container[tappedname];
}