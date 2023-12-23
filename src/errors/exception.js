/**
 * @module errors/exception
 */
'use strict';

const ERR_BAD_PROCESSOR = `functionish/errors/exception(): The processor has type %s. Expected a function.`;

const compose = require('../compose');
const curry1 = require('../curry1');
const error = require('./error');
const isfunction = require('../types/isfunction');
const iterate = require('../lists/iterate');
const or = require('../logic/or');
const raise = require('./raise');
const typeorclassname = require('../types/typeorclassname');

const raisebadprocessor = compose(raise, error.Type(ERR_BAD_PROCESSOR), typeorclassname);
const validateprocessor = or(isfunction, raisebadprocessor);
const validateprocessors = iterate(validateprocessor);

/**
 * to do
 * 
 * @function exception
 */
const exception = curry1(function exception(errorname, errormessage, ...processors) {

    validateprocessors(processors);

    return compose(
        raise,
        error(errorname, errormessage),
        ...processors.reverse()
    )
});

module.exports = exception;