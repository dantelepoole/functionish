/**
 * @module lib/test/evaluate
 * @ignore
 */

const Runnable = require('./dispatch').Runnable;

function evaluate(source) {

    return (source instanceof Runnable)
         ? source.run()
         : source;
}

module.exports = evaluate;