/**
 * @module errors/validator2
 */
'use strict';

const ERR_BAD_VALIDATOR = `functionish/errors/validator2(): The validation function has type %s. Expected a function.`;
const ERR_NO_VALIDATORS = `functionish/errors/validator2(): At least one validator function is required.`;

const and = require('../logic/and');
const boolify = require('../logic/boolify');
const compose = require('../compose');
const error = require('./error');
const formatter = require('../misc/formatter');
const hasitems = require('../misc/hasitems');
const isfunction = require('../types/isfunction');
const or = require('../logic/or');
const raise = require('./raise');
const typeorclassname = require('../types/typeorclassname');

const validate = compose(boolify, and);

const raisebadvalidator = compose(raise, error.Type(ERR_BAD_VALIDATOR), typeorclassname);
const raisenovalidators = compose(raise, error.Type(ERR_NO_VALIDATORS));

const validatevalidator = or(isfunction, raisebadvalidator);
const validatevalidators = validators => hasitems(validators)
                                       ? validators.forEach(validatevalidator)
                                       : raisenovalidators();

/**
 * to do
 * 
 * @function validator2
 */
function validator2(errorname, messageformat, ...validators) {

    validatevalidators(validators);

    isfunction(messageformat) || (messageformat = formatter(messageformat));

    return or(
        validate(...validators),
        raiseerror.bind(null, errorname, messageformat)
    )
}

function raiseerror(errorname, messageformat, ...args) {

    const error = new Error( messageformat(...args) );

    error.name = (errorname ?? 'Error');

    throw error;
}

module.exports = validator2;