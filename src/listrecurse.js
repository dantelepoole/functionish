/**
 * @module listrecurse
 */

'use strict';

const curry = require('./curry');
const lookaheaditerator = require('./lists/lookaheaditerator');
const recurse = require('./recurse');

function listrecurse(func, ...args) {

    const list = args.pop();

    return recurse(func, ...args, lookaheaditerator(list));
}

module.exports = curry(1, listrecurse);