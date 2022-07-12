/**
 * @module tap
 */

'use strict';

const ERR_BAD_FUNCTION = `TapError~The function has type %s. Expected a function.`;

const fail = require('./fail');
const typeorclass = require('./typeorclass');

/**
 * Return a function that passes its arguments to *func*, but ignores *func*'s return value and instead returns the
 * first argument (or `undefined` if no arguments were passed).
 * 
 * @func tap
 * @param {function} func The function to call
 * @returns {any} The first argument passed to the returned function
 */
 module.exports = function tap(func) {

    if(typeof func !== 'function') fail(ERR_BAD_FUNCTION, typeorclass(func));

    const tapname = `tap ${func.name}`;

    return {

        [tapname] : function(...args) {

            func.call(this, ...args);
            
            return args[0];
        }

    }[tapname]
}
