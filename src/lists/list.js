/**
 * @module lists/list
 */

'use strict';

// const List = require('../../lib/List');

const isfunction = require('../types/isfunction');

const isiterable = iterable => isfunction(iterable?.[Symbol.iterator]);
const raisenotiterable = () => { throw new TypeError(`The argument is not iterable`); }

function list(source) {
    
    return isfunction(source) ? { [Symbol.iterator]:source } // new List( { [Symbol.iterator]:source } )
         : isiterable(source) ? { [Symbol.iterator]:source[Symbol.iterator] } // new List(source)
         : raisenotiterable();
}

module.exports = list;