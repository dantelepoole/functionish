/**
 * @module select
 */

'use strict';

const always = require('./always');
const compose = require('./compose');
const id = require('./id');
const isfunction = require('./types/isfunction');
const last = require('./collections/last');
const pop = require('./collections/pop');
const when = require('./when');

const hasdefaultclause = compose(isfunction, last);
const getdefaultclause = when(hasdefaultclause, pop, always(id));

module.exports = function select(...clauses) {

    const defaultclause = getdefaultclause(clauses);

    return clauses.reduceRight(selectreducer, defaultclause);
}

function selectreducer(onpredicatefail, clause) {

    const [predicate, action] = clause;

    isfunction(predicate) || (predicate = always(predicate));

    return (...args) => predicate(...args) ? action(...args) : onpredicatefail(...args);
}
