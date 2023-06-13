/**
 * @module recurse
 */

'use strict';

function recurse(func, ...args) {

    const recurse = (...recurseargs) => (args = recurseargs);

    let result = args;

    while(result === args) result = func(recurse, ...args);

    return result;
}

module.exports = recurse;