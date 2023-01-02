/**
 * @module tap
 */

'use strict';

const isfunction = require('./isfunction');
const loadfunction = require('./loadfunction');

module.exports = function tap(tappedfunc, nextfunc) {

    isfunction(tappedfunc) || (tappedfunc = loadfunction(tappedfunc));

    if(arguments.length === 1) return (...args) => (tappedfunc(...args), args[0]);

    isfunction(nextfunc) || (nextfunc = loadfunction(nextfunc));

    return (...args) => (tappedfunc(...args), nextfunc(...args));
}