/**
 * @module misc/stringtruncate
 */

'use strict';

const ELLIPSIS = '...';
const ERRORMSG_MAXCHARS = `functionish/misc/stringtruncate(): The maxcharacters argument is %s. Expected a positive integer of 1 or more.`;

const compose = require('../compose');
const curry2 = require('../curry2');
const error = require('../errors/error');
const isinteger = require('../types/isinteger');
const isnumberornan = require('../types/isnumberornan');
const isstring = require('../types/isstring');
const not = require('../logic/not');
const or = require('../logic/or');
const raise = require('../errors/raise');
const when = require('../when');

const normalize = compose(JSON.stringify, String);
const lessthan1 = x => (x < 1);
const maxcharserror = error.Type(ERRORMSG_MAXCHARS);
const buildmaxcharserror = max => isnumberornan(max)
                                ? maxcharserror(`is ${max}`)
                                : maxcharserror(`has type ${typeof max}`);
const isbadmaxchars = or(lessthan1, not(isinteger));
const raisemaxcharserror = compose(raise, buildmaxcharserror);
const validatemaxchars = when(isbadmaxchars, raisemaxcharserror);

/**
 * to do
 * 
 * @example <caption>Example usage of `stringtruncate()`</caption>
 *
 * to do 
 * 
 * @function stringtruncate
 * @returns {string}
 */
const stringtruncate = curry2(function stringtruncate(limitmarker=ELLIPSIS, maxcharacters, string) {
    
    validatemaxchars(maxcharacters);

    isstring(limitmarker) || (limitmarker = normalize(limitmarker))
    
    const normalized = normalize(string);

    return (normalized.length <= maxcharacters) ? normalized
         : (maxcharacters <= limitmarker.length) ? normalized.slice(0, maxcharacters)
         : normalized.slice(0, maxcharacters - limitmarker.length) + limitmarker;
})

module.exports = stringtruncate;