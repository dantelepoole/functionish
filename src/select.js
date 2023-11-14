/**
 * @module select
 */

'use strict';

const DEFAULT_BRANCH = () => undefined;

const always = require('./always');
const applicable = require('./applicable');
const callable = require('./callable');
const compose = require('./compose');
const is = require('./misc/is');
const isfunction = require('./types/isfunction');
const isvoid = require('./types/isvoid');
const pop = require('./arrays/pop');
const reduceright = require('./lists/reduceright');
const tail = require('./arrays/tail');

const casereducer = (nextclause, [condition, branch]) => when(
    initcondition(condition),
    initbranch(branch),
    nextclause
)

const compilecases = reduceright(casereducer);
const hasdefaultbranch = compose(isfunction, tail);
const initbranch = compose(always, callable);
const initcondition = when(isfunction, applicable, compose(applicable, is));
const initexpression = when(isvoid, applicable, compose(applicable, expression));

/**
 * to do
 * 
 * @example <caption>Example usage of `select()`</caption> 
 *     
 * to do
 * 
 * @function select
 * @returns {function}
 */
function select(expression, ...cases) {

    const defaultbranch = hasdefaultbranch(cases)
                        ? pop(cases)
                        : DEFAULT_BRANCH;

    const selectbranch = compilecases( initbranch(defaultbranch), cases );
    
    const runexpression = initexpression(expression);

    const runselect = compose(selectbranch, runexpression);

    const _select = (...args) => runselect(...args)(...args);

    _select.for = (conditionarg, ...branchargs) => runselect(conditionarg)(...branchargs);

    return _select;
}

module.exports = select;