/**
 * @module promises/retry
 */

'use strict';

const DEFAULT_THROTTLE = require('os').cpus().length;

const DEFAULT_CONFIG = Object.freeze({
    basedelay   : 100,
    maxdelay    : 3_000,
    maxretries  : 5,
    queryretry  : require('../noop'),
    throttle    : DEFAULT_THROTTLE
});

const compose = require('../compose');
const curry2 = require('../curry2');
const flip = require('../flip');
const merge = require('../misc/merge');
const partial = require('../partial');
const pcatch = require('./pcatch');
const pdelay = require('./pdelay');
const promise = require('./promise');
const promisify = require('./promisify');
const raise = require('../misc/raise');

const applyjitter = delayms => Math.trunc( (delayms/2) + (Math.random() * (delayms/2)) );
const calculatebackoff = basedelay => retrycount => (basedelay * Math.pow(2, retrycount));
const configfactory = options => merge(DEFAULT_CONFIG, options);
const delaytargetfunc = compose(flip(pdelay), promisify);
const enforcemaxdelay = maxdelay => delayms => Math.min(delayms, maxdelay);
const enforcemaxretries = maxretries => (retrycount, error) => (retrycount <= maxretries) ? retrycount : raise(error);
const queryretry = (config, retrycount, error) => delayms => config.queryretry(retrycount, error, delayms) ?? delayms;

function retry(options, targetfunc, ...args) {

    targetfunc = partial(targetfunc, ...args);

    const onreject = initrejecthandler(
        delaytargetfunc(targetfunc),
        configfactory(options)
    );

    return pcatch( onreject, promise(targetfunc) );
}

function initrejecthandler(delayedtargetfunc, config) {
    
    let retrycount = 0;
    
    const calculatedelay = compose(
        applyjitter,
        enforcemaxdelay(config.maxdelay),
        calculatebackoff(config.basedelay)
    );
    
    const attachrejecthandler = pcatch(onreject);

    return onreject;
    
    function onreject(error) {

        retrycount += 1;

        const handlerejection = compose(
            attachrejecthandler,
            delayedtargetfunc,
            queryretry(config, retrycount, error),
            calculatedelay,
            enforcemaxretries(config.maxretries)
        );
            
        return handlerejection(retrycount, error);
    }

}

module.exports = curry2(retry);