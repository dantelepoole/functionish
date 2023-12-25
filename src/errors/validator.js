/**
 * @module errors/validator
 */
'use strict';

const ERR_BAD_ERRORHANDLER = `functionish/errors/validator(): The error handler has type %s. Expected a function.`;
const ERR_BAD_VALIDATOR = `functionish/errors/validator(): The validation function has type %s. Expected a function.`;
const ERR_NO_VALIDATORS = `functionish/errors/validator(): At least one validator function is required.`;

const and = require('../logic/and');
const boolify = require('../logic/boolify');
const compose = require('../compose');
const error = require('./error');
const hasitems = require('../misc/hasitems');
const isfunction = require('../types/isfunction');
const isvoid = require('../types/isvoid');
const or = require('../logic/or');
const raise = require('./raise');
const typeorclassname = require('../types/typeorclassname');

const buildvalidation = compose(boolify, and);

const raisebaderrorhandler = compose(raise, error.Type(ERR_BAD_ERRORHANDLER), typeorclassname);
const raisebadvalidator = compose(raise, error.Type(ERR_BAD_VALIDATOR), typeorclassname);
const raisenovalidators = compose(raise, error.Type(ERR_NO_VALIDATORS));

const validateerrorhandler = or(isfunction, isvoid, raisebaderrorhandler);
const validatevalidator = or(isfunction, raisebadvalidator);
const validatevalidators = validators => validators.forEach(validatevalidator);

/**
 * to do
 * 
 * @function validator
 */
function validator(onerror, ...validators) {

    validateerrorhandler(onerror);

    hasitems(validators) ? validatevalidators(validators) : raisenovalidators();

    const validate = buildvalidation(...validators);

    return isvoid(onerror)
         ? validate
         : or(validate, onerror);
}

module.exports = validator;