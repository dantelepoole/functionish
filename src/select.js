/**
 * @module select
 */

'use strict';

const DEFAULT_PREDICATE = () => true;
const CONTEXTUAL_ID = context => context.args[0];
const SIMPLE_ID = x => x;

const compose = require('./compose');
const curry2 = require('./curry2');
const curry3 = require('./curry3');
const isfunction = require('./types/isfunction');
const isvoid = require('./types/isvoid');
const last = require('./collections/last');
const pop = require('./collections/pop');
const when = require('./when');

const map = curry2(__dirname + '/map');
const push = curry2(__dirname + './collections/push');
const reduceright = curry3(__dirname + '/lists/reduceright');

const defaultclausefactory = defaultbranch => [DEFAULT_PREDICATE, defaultbranch];
const hasdefaultbranch = compose(isfunction, last);
const initdefaultclause = compose(defaultclausefactory, pop);
const initdefaultbranch = clauses => push( clauses, initdefaultclause(clauses) );
const initclauses = when(hasdefaultbranch, initdefaultbranch);

const selectreducer = (nextclause, clause) => when(clause[0], clause[1], nextclause);
const selector = reduceright(selectreducer);
const selectcontextual = selector(CONTEXTUAL_ID);
const selectsimple = selector(SIMPLE_ID);

const contextfactory = expression => (...args) => ( { test:expression(...args), args } );

const contextualbranch = clause => context => clause[1](...context.args);
const contextualpredicate = clause => context => clause[0](context.test);

const contextualize = clause => [ contextualpredicate(clause), contextualbranch(clause) ];
const contextualizeall = map(contextualize);
const contextualselectorfactory = compose(selectcontextual, contextualizeall);

const contextualselector = (expression, clauses) => compose(
    contextualselectorfactory(clauses),
    contextfactory(expression)
)

module.exports = function select(expression, ...clauses) {

    initclauses(clauses);

    return isvoid(expression) ? selectsimple(clauses) : contextualselector(expression, clauses);
}