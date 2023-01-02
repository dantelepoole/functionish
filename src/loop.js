/**
 * @module loop
 */

'use strict';

const ABORTLOOP = Symbol();

const partial = require('./partial');

/**
 * Return a function that repeatedly passes its arguments to *loopfunc* until signaled to stop.
 * 
 * On each iteration, *loopfunc*'s `this` has a `context` property with an `index` property that holds the
 * current loopcount (`0` on the initial iteration). *loopfunc* can add custom properties to the
 * context to pass data to itself on subsequent iterations.
 * 
 * To signal the end of the loop, *loopfunc* should invoke the context's `endloop()` function and return
 * the result. Any argument passed to `this()` will be returned as the result of the loop.
 * 
 * @example
 * 
 * const loop = require('functionish/loop');
 * 
 * // an extremely inefficient sum-implementation, for illustrative purposes only
 * function sum(numbers) {
 * 
 *      const {index, endloop} = this;
 * 
 *      if(index === 0) this.sum = 0;
 * 
 *      if(index === numbers.length) return endloop(this.sum);
 * 
 *      this.sum += numbers[index];
 * }
 * 
 * loop( sum, [1,2,3] ); // returns 6
 * 
 * @function loop
 * @param {function} loopfunc The function to repeatedly invoke
 * @returns {function}
 */
module.exports = function loop(loopfunc, ...args) {

    let loopresult = undefined;
    const endloop = result => (loopresult = result, ABORTLOOP);

    const context = { index:0, endloop }

    while( ABORTLOOP !== loopfunc.call(context, ...args) ) context.index++;

    return loopresult;
}
