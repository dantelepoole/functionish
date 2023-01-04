/**
 * @module select
 */

'use strict';

const always = require('./always');
const compose = require('./compose');
const isfunction = require('./types/isfunction');
const last = require('./collections/last');
const pop = require('./collections/pop');
const when = require('./when');

const expressbranch = branch => (expression, args) => branch(...args);
const expresspredicate = predicate => expression => predicate(expression);

const hasdefaultbranch = compose(isfunction, last);
const getdefaultbranch = when(hasdefaultbranch, pop, always(id));
const getdefaultexpressbranch = compose(expressbranch, getdefaultbranch);

const expressreducer = (nextclause, clause) => when(expresspredicate(clause[0]), expressbranch(clause[1]), nextclause);
const simplereducer = (nextclause, clause) => when(clause[0], clause[1], nextclause);

const simpleselect = clauses => clauses.reduceRight(simplereducer, getdefaultbranch(clauses));

module.exports = function select(expression, ...clauses) {
    return isvoid(expression) ? simpleselect(clauses) : expresselect(expression, clauses);
}

function expresselect(expression, clauses) {

    const select = clauses.reduceRight(expressreducer, getdefaultexpressbranch(clauses));

    return (...args) => select( expression(...args), args );

}