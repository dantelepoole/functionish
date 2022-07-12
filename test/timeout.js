const expect = require('chai').expect;
const timeout = require('../timeout');

function waitfor(callback, ...expectedargs) {

    return function wait(...args) {
        expect(args).to.be.deep.equal(expectedargs);
        callback();
    }

}

const noop = ()=>{}

describe(`timeout()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should throw if the delay argument is not a positive integer`,
        function() {
            expect( ()=>timeout(3.33, noop) ).to.throw();
            expect( ()=>timeout(-3, noop) ).to.throw();
            expect( ()=>timeout('foobar', noop) ).to.throw();
        }
    )

    it(`should throw if the target function is not a function`,
        function() {
            expect( ()=>timeout(100, {}) ).to.throw();
            expect( ()=>timeout(100) ).to.throw();
        }
    )

    it(`should return a function`,
        function (callback) {
            expect( timeout(0, waitfor(callback)) ).to.be.a('function');
        }
    )

    describe(`timeout()'s returned function`, function () {

        it(`should return undefined`,

            function (callback) {

                const cleartimeout = timeout(0,waitfor(callback) );
                expect( cleartimeout() ).to.be.undefined;
                callback();
            }
        )
    })
})