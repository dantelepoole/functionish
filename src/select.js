/**
 * @module select
 */

'use strict';

const DEFAULT_BRANCH = () => undefined;

const always = require('./always');
const applicable = require('./applicable');
const callable = require('./callable');
const compose = require('./compose');
const id = require('./id');
const is = require('./misc/is');
const isfunction = require('./types/isfunction');
const isvoid = require('./types/isvoid');
const partial = require('./partial');
const pop = require('./arrays/pop');
const reduceright = require('./lists/reduceright');
const tail = require('./arrays/tail');

const casereducer = (nextclause, [condition, branch]) => when(
    initcondition(condition),
    initbranch(branch),
    nextclause
)

const initbranch = compose(always, callable);
const initcondition = when(isfunction, id, is);

const initexpression = partial(compose, applicable);
const buildexpression = when(isvoid, always(applicable), initexpression);

const compilecases = reduceright(casereducer);
const hasdefaultbranch = compose(isfunction, tail);

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
    
    const runexpression = buildexpression(expression);

    const runselect = compose(selectbranch, runexpression);

    const _select = (...args) => runselect(...args)(...args);

    _select.for = (conditionarg, ...branchargs) => runselect(conditionarg)(...branchargs);

    return _select;
}

module.exports = select;