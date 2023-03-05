/**
 * @module promises/retry
 */

'use strict';

const DEFAULT_CONFIG = Object.freeze({
    basedelay   : 100,
    maxdelay    : 3_000,
    maxretries  : 5,
    queryretry  : require('../noop'),
    throttle    : require('../misc/cpuinfo').length
})

const compose = require('../compose');
const curry = require('../curry');
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
const queryretry = (queryretry, retrycount, error) => delayms => queryretry(retrycount, error, delayms) ?? delayms;

const initcalculatedelay = config => compose(
    applyjitter, enforcemaxdelay(config.maxdelay), calculatebackoff(config.basedelay)
)

function retry(options, targetfunc, ...args) {

    targetfunc = partial(targetfunc, ...args);

    const config = configfactory(options);
    const delayedtargetfunc = delaytargetfunc(targetfunc);
    const calculatedelay = initcalculatedelay(config);

    return pcatch(
        initrejecthandler(delayedtargetfunc, config, calculatedelay),
        promise(targetfunc)
    )
}

function initrejecthandler(delayedtargetfunc, config, calculatedelay) {
    
    let retrycount = 0;
    const incrementretrycount = () => (retrycount += 1);

    return function onreject(error) {

        incrementretrycount();

        const handlerejection = compose(
            pcatch(onreject),
            delayedtargetfunc,
            queryretry(config.queryretry, retrycount, error),
            calculatedelay,
            enforcemaxretries(config.maxretries)
        )
            
        return handlerejection(retrycount, error);
    }

}

module.exports = curry(1, retry);