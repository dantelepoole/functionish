/**
 * @module tailrecurse
 */

'use strict';

function tailrecurse(func, ...args) {

    const recurse = (...recurseargs) => (args = recurseargs);

    let result = func.call(recurse, ...args);

    while(result === args) result = func.call(recurse, ...args);

    return result;
}

module.exports = tailrecurse;