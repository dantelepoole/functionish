/**
 * @module select
 */

'use strict';

const DEFAULT_PREDICATE = () => true;
const DATAAWARE_ID = (expression, args) => args[0];

const always = require('./always');
const compose = require('./compose');
const id = require('./id');
const isdefined = require('./isdefined');
const isfunction = require('./types/isfunction');
const last = require('./collections/last');
const map = require('./map');
const partial = require('./partial');
const pop = require('./collections/pop');
const when = require('./when');

const expressionizeclause = clause => [predicatedata => clause[0](predicatedata), (_, args) => clause[1](...args)];
const expressionize = partial(map, expressionizeclause);

const hasdefaultbranch = compose(isfunction, last);
const initdefaultbranch = clauses = hasdefaultbranch(clauses) && clauses.push( [DEFAULT_PREDICATE, pop(clauses)] );

const selectreducer = (nextclause, clause) => when(clause[0], clause[1], nextclause);
const simpleselect = clauses => clauses.reduceRight(selectreducer, id);

module.exports = function select(expression, ...clauses) {

    initdefaultbranch(clauses);

    return isdefined(expression) ? expressionselect(expression, clauses)
                                 : simpleselect(clauses);
}

function expressionselect(expression, clauses) {

    clauses = expressionize(clauses);

    const executeselect = clauses.reduceRight(selectreducer, DATAAWARE_ID);

    return (...args) => executeselect( expression(...args), args );
}