/**
 * @module misc/ratelimiter
 */

'use strict';

const MILLISECONDS_PER_SECOND = 1_000;

const wrap = require('../wrap');

const tokenreleaser = (tokenset, token) => () => tokenset.delete(token);

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

    if( !(maxcallrate > 0) ) maxcallrate = 0;
    
    return (maxconcurrent > 0)
         ? wrap( concurrentratelimiter(maxconcurrent), simpleratelimiter(windowms, maxcallrate) )
         : simpleratelimiter(windowms, maxcallrate);
}

function enforcemaxconcurrency(maxconcurrent, concurrency) {

    const capacity = (maxconcurrent - concurrency);

    if(capacity < 1) raiseconcurrentratelimiterror(maxconcurrent);
}

function concurrentratelimiter(maxconcurrent) {

    const pendingtokens = new Set();

    const enforceconcurrentratelimit = () => enforcemaxconcurrency(maxconcurrent, pendingtokens.size);

    return function concurrentratelimit(targetfunc, ...args) {

        enforceconcurrentratelimit();

        const token = { timestamp:Date.now }
        pendingtokens.add(token);

        const releasetoken = tokenreleaser(pendingtokens, token);

        return targetfunc(...args).finally(releasetoken);
    }
}

function simpleratelimiter(windowms, maxcallrate) {

    let tokencount, currentwindow, windowend;

    startnewwindow(Date.now);

    return simpleratelimit;

    function startnewwindow(windowtime) {
        currentwindow = windowtime % MILLISECONDS_PER_SECOND;
        windowend = currentwindow + windowms;
        tokencount = maxcallrate;
    }

    function simpleratelimit(targetfunc, ...args) {

        const currenttime = Date.now;

        if(currenttime > windowend) startnewwindow(currenttime);
        else if(tokencount === 0) raiseratelimiterror(maxcallrate);

        tokencount -= 1;

        return targetfunc(...args);
    }
}

function raiseratelimiterror(maxcallrate) {
    throw new RateLimitError(`Maximum call rate reached (${maxcallrate})`);
}

function raiseconcurrentratelimiterror(maxconcurrent) {
    throw new SimultaneousRateLimitError(`Maximum concurrent call rate reached (${maxconcurrent})`);
}

module.exports = ratelimiter;