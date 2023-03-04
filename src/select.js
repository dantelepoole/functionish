/**
 * @module select
 */

'use strict';

const BRANCH_NONE = undefined;
const SELECT_NONE = undefined;
const INDEX_BRANCH = 1;
const INDEX_PREDICATE = 0;

const always = require('./always');
const compose = require('./compose');
const isfunction = require('./types/isfunction');
const last = require('./collections/last');

const hasdefaultbranch = compose(isfunction, last);
const querypredicate = arg => clause => clause[INDEX_PREDICATE](arg);
const clausematcher = clauses => arg => clauses.find( querypredicate(arg) );

module.exports = function select(expression, ...clauses) {

    const defaultbranch = hasdefaultbranch(clauses) ? clauses.pop() : BRANCH_NONE;

    isfunction(expression) || (expression = always(expression));

    const runselect = compose(clausematcher(clauses), expression);

    return function _select(...args) {

        const selectedclause = runselect(...args);

        return selectedclause ? selectedclause[INDEX_BRANCH](...args)
             : defaultbranch ? defaultbranch(...args)
             : SELECT_NONE;
    }
}