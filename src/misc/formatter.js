/**
 * @module misc/formatter
 */

'use strict';

const ERR_BAD_FORMATSTRING = `functionish/misc/formatter(): The format string has type %s. Expected a string.`;
const ERR_BAD_PREPROCESSOR = `functionish/misc/formatter(): The preprocessor has type %s. Expected a function.`;

const compose = require('../compose');
const error = require('../errors/error');
const format = require('./format');
const hasitems = require('./hasitems');
const id = require('../id');
const isfunction = require('../types/isfunction');
const isstring = require('../types/isstring');
const isvoid = require('../types/isvoid');
const partial = require('../partial');
const raise = require('../errors/raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadformatstring = compose(raise, error.Type(ERR_BAD_FORMATSTRING), typeorclassname);
const raisebadpreprocessor = compose(raise, error.Type(ERR_BAD_PREPROCESSOR), typeorclassname);

const initformatter = (formatstring, processor) => (...args) => format(formatstring, ...processor(...args));

/**
 * to do
 */
function formatter(formatstring, ...processors) {

    isstring(formatstring) || raisebadformatstring(formatstring);

    return hasitems(processors)
         ? initformatter(formatstring, initprocessor(processors))
         : format.bind(null, formatstring);
}


function initprocessor(processors) {

    for(let i=0; i<processors.length; i += 1) {

        if( isfunction(processors[i]) ) continue;
        else if( isvoid(processors[i]) ) processors[i] = id;
        else raisebadpreprocessor(processors[i]);
    }

    return composeprocessors(processors);
}

function composeprocessors(processors) {

    return function preprocessor(...args) {

        if(args.length < processors.length) args.length = processors.length;

        for(let i = 0; i < processors.length; i += 1) args[i] = processors[i]( args[i] );

        return args;
    }
}

module.exports = formatter;