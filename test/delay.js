const delay = require('../src/delay');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const id = x => x;

const fakeclearTimeout = sinon.fake(clearTimeout);
const nativeclearTimeout = global.clearTimeout;
global.clearTimeout = fakeclearTimeout;

function iswithin10percent(targetvalue, actualvalue) {

    const rangelow = targetvalue * 0.9;
    const rangehi = targetvalue * 1.1;

    return (actualvalue >= rangelow && actualvalue <= rangehi);
}

describe( 'delay()', function() {

        after(function () {
            global.clearTimeout = nativeclearTimeout;
        })

        beforeEach(function () {
            sinon.resetHistory();
            fakeclearTimeout.resetHistory();
        })

        it('should return a function', function() {

            const canceldelayedfunction = delay(0, id, UNIQTHING);
            expect(canceldelayedfunction).to.be.a('function');

            canceldelayedfunction();
        })

        it('should throw if the delayms argument is not an integer of at least 0', function() {

            expect( ()=>delay(-1, id, UNIQTHING) ).to.throw;
            expect( ()=>delay(0.5, id, UNIQTHING) ).to.throw;
            expect( ()=>delay(null, id, UNIQTHING) ).to.throw;
        })

        it('should throw if the target function is not a function', function() {

            expect( ()=>delay(1, null, UNIQTHING) ).to.throw;
            expect( ()=>delay(1, UNIQTHING) ).to.throw;
            expect( ()=>delay(1) ).to.throw;
        })

        it('should call the target function after at least 90% of delayms milliseconds have elapsed', function(done) {

            function callback(delayms, startms) {

                const elapsedms = Date.now() - startms;
                const minelapsedms = 0.9 * delayms;

                const error = (elapsedms >= minelapsedms)
                            ? undefined
                            : new Error(`The elapsed time was ${elapsedms}. It should have been at least ${minelapsedms} (90% of ${delayms})`);

                done(error);
            }

            const delayms = 100;
            delay(delayms, callback, delayms, Date.now());
        })

        it('should call the target function with the arguments passed to delay()', function(done) {

            function callback(value1, value2) {

                const error = (value1 === UNIQTHING && value2 === 'fubar' && arguments.length === 2)
                            ? undefined
                            : new Error(`The delayed function did not receive the correct arguments.`);

                done(error);
            }

            delay(10, callback, UNIQTHING, 'fubar');
        })

        describe( 'The result function', function() {

            it('should call clearTimeout() to cancel the delayed function', function() {
                
                expect(fakeclearTimeout.callCount).to.be.equal(0);

                const canceldelayedid = delay(100, id, UNIQTHING);
                canceldelayedid();

                expect(fakeclearTimeout.callCount).to.be.equal(1);
            })

        })
    }
);