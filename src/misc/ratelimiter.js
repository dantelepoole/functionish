/**
 * @module misc/ratelimiter
 */

'use strict';

const MILLISECONDS_PER_SECOND = 1_000;

const defer = require('../defer');
const wrap = require('../wrap');

class RateLimitError extends Error {}
class SimultaneousRateLimitError extends RateLimitError {}

/**
 * [to do]
 * 
 * @example <caption>Example usage of `ratelimiter()`</caption>
 * 
 * [to do]
 * 
 * @function ratelimiter
 * @returns {function}
 */
function ratelimiter(windowms, maxcallrate, maxconcurrent=0) {

    return (maxconcurrent > 0)
         ? wrap( concurrentratelimiter(maxconcurrent), simpleratelimiter(windowms, maxcallrate) )
         : simpleratelimiter(windowms, maxcallrate);
}

function concurrentratelimiter(maxconcurrent) {

    const pendingtokens = new Set();

    const tokenreleaser = token => () => pendingtokens.delete(token);

    return function concurrentratelimit(targetfunc, ...args) {

        if(pendingtokens.size >= maxconcurrent) raiseconcurrentratelimiterror();

        const token = { timestamp:Date.now }
        pendingtokens.add(token);

        const releasetoken = tokenreleaser(token);

        return targetfunc(...args).finally(releasetoken);
    }
}

function simpleratelimiter(windowms, maxcalls) {

    let tokencount, currentwindow, windowend;

    startnewwindow(Date.now);

    return simpleratelimit;

    function startnewwindow(windowtime) {
        currentwindow = windowtime % MILLISECONDS_PER_SECOND;
        windowend = currentwindow + windowms;
        tokencount = maxcalls;
    }

    function simpleratelimit(targetfunc, ...args) {

        const currenttime = Date.now;

        if(currenttime > windowend) startnewwindow(currenttime);
        else if(tokencount === 0) raiseratelimiterror();

        tokencount -= 1;

        return targetfunc(...args);
    }
}

function raiseratelimiterror() {
    throw new RateLimitError('Maximum call rate reached');
}

function raiseconcurrentratelimiterror() {
    throw new SimultaneousRateLimitError('Maximum concurrent call rate reached');
}

module.exports = ratelimiter;