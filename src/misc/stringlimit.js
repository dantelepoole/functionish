/**
 * @module misc/stringlimit
 */

'use strict';

const ELLIPSIS = '...';
const ERRORMSG_MAXCHARS = `functionish/misc/stringlimit(): The maxcharacters argument %s. Expected a positive integer of 1 or more.`;

const compose = require('../compose');
const curry = require('../curry');
const error = require('../errors/error');
const isinteger = require('../types/isinteger');
const isnumberornan = require('../types/isnumberornan');
const not = require('../logic/not');
const or = require('../logic/or');
const raise = require('../errors/raise');
const when = require('../when');

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
 * @example <caption>Example usage of `stringlimit()`</caption>
 *
 * to do 
 * 
 * @function stringlimit
 * @returns {string}
 */
function stringlimit(limitmarker=ELLIPSIS, maxcharacters, string) {
    
    validatemaxchars(maxcharacters);

    return (string.length <= maxcharacters) ? string
         : (maxcharacters <= limitmarker.length) ? string.slice(0, maxcharacters)
         : string.slice(0, maxcharacters - limitmarker.length) + limitmarker;
}

module.exports = curry(2, stringlimit);