/**
 * @module misc/stack
 */

'use strict';

const Stack = require('../../lib/Stack');

function stack(...initialitems) {
    return new Stack(...initialitems);
}

module.exports = stack;