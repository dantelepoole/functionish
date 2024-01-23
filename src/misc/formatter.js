/**
 * @module misc/formatter
 */

'use strict';

const ERR_BAD_FORMATSTRING = `functionish/misc/formatter(): The format string has type %s. Expected a string.`;
const ERR_BAD_PREPROCESSOR = `functionish/misc/formatter(): The preprocessor has type %s. Expected a function.`;

const format = require('./format');
const hasitems = require('./hasitems');
const id = require('../id');
const isfunction = require('../types/isfunction');
const isstring = require('../types/isstring');
const isvoid = require('../types/isvoid');
const typeorclassname = require('../types/typeorclassname');

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

    const processorcount = processors.length;

    return function preprocessor(...args) {

        if(args.length < processorcount) args.length = processorcount;

        for(let i = 0; i < processorcount; i += 1) args[i] = processors[i]( args[i] );

        return args;
    }
}

function raisebadformatstring(formatstring) {
    throw new TypeError(format(ERR_BAD_FORMATSTRING, typeorclassname(formatstring)));
}

function raisebadpreprocessor(processor) {
    throw new TypeError(format(ERR_BAD_PREPROCESSOR, typeorclassname(processor)));
}

module.exports = formatter;