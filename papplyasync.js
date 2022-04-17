/**
 * @module papplyasync
 */

'use strict';

module.exports = function papplyasync(func, ...args) {

    const executor = executorfactory(func, ...args);
    
    return new Promise(executor);
}
 
function executorfactory(func, ...args) {

    return function executor(resolve, reject) {

        queueMicrotask(

            function papplyasync_microtask() {

                try {
                    const result = func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            }
        )
    }

}