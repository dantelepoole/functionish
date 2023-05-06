/**
 * @module listrecurse
 */

'use strict';

const indexiterator = require('./lists/indexiterator');

function listrecurse(func, ...args) {

    const list = args.pop();
    const iterator = indexiterator(list);

    const recurse = (...recurseargs) => (args = recurseargs);

    let result = func.call(recurse, ...args, iterator.next());

    while(result === args) result = func.call(recurse, ...args, iterator.next());

    return result;
}

module.exports = listrecurse;