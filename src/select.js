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
const find = require('./lists/find');
const isfunction = require('./types/isfunction');
const last = require('./collections/last');

const hasdefaultbranch = compose(isfunction, last);
const querypredicate = x => clause => clause[INDEX_PREDICATE](x);
const queryclause = clauses => querypredicate => find(querypredicate, clauses);

module.exports = function select(expression, ...clauses) {

    const defaultbranch = hasdefaultbranch(clauses) ? clauses.pop() : BRANCH_NONE;

    isfunction(expression) || (expression = always(expression));

    const findtargetclause = compose(queryclause(clauses), querypredicate, expression);

    return function _select(x, ...args) {

        const targetclause = findtargetclause(x);

        return targetclause ? targetclause[INDEX_BRANCH](...args)
             : defaultbranch ? defaultbranch(...args)
             : SELECT_NONE;

    }
}
