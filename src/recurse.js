/**
 * @module recurse
 */

'use strict';

function recurse(func, ...args) {

    const _signalrecurse = (...recurseargs) => (args = recurseargs);
    const context = { [func.name]:_signalrecurse }

    let result = args;

    while(result === args) result = func.call(context, ...args);

    return result;

}

module.exports = recurse;