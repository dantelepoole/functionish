/**
 * @module listrecurse
 */

'use strict';

const listiterator = require('./lists/listiterator');
const recurse = require('./recurse');

function listrecurse(func, ...args) {

    const list = args.pop();

    return recurse(func, ...args, listiterator(list));
}

module.exports = listrecurse;