/**
 * @module lib/curry
 * @ignore
 */

'use strict';

const SYMBOL_CURRYARITY = require('./FSymbol').CurryArity;

const defineproperty = Object.defineProperty;

function tagcurryarity(curriedfunc, arity) {

    return defineproperty(
        curriedfunc,
        SYMBOL_CURRYARITY,
        { value:arity }
    )
    
}

module.exports = tagcurryarity;