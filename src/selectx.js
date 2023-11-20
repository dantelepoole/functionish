/**
 * @module selectx
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
 * @example <caption>Example usage of `selectx)`</caption> 
 *     
 * to do
 * 
 * @function selectx
 * @returns {function}
 */
function selectx(expression, ...cases) {

    const defaultbranch = hasdefaultbranch(cases)
                        ? pop(cases)
                        : DEFAULT_BRANCH;

    const selectbranch = compilecases( initbranch(defaultbranch), cases );
    
    const runexpression = buildexpression(expression);

    const runselectx = compose(selectbranch, runexpression);

    const _selectx = (conditionarg, ...branchargs) => runselectx(conditionarg)(...branchargs);

    _selectx.for = (...conditionargs) => runselectx(...conditionargs);

    return _selectx;
}

module.exports = selectx;