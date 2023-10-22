/**
 * @module recurse
 */

'use strict';

function recurse(targetfunc, ...args) {

    const recurse = (...recurseargs) => (args = recurseargs);

    let result = targetfunc(recurse, ...args);

    while(result === args) result = targetfunc(recurse, ...args);

    return result;
}

module.exports = recurse;