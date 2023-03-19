/**
 * @module misc/queue
 */

'use strict';

const Queue = require('../../lib/Queue');

function queue(...initialitems) {
    return new Queue(...initialitems);
}

module.exports = queue;