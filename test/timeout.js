const expect = require('chai').expect;
const timeout = require('../timeout');

function waitfor(callback, ...expectedargs) {

    return function wait(...args) {
        expect(args).to.be.deep.equal(expectedargs);
        callback();
    }

}

describe(`timeout()`, function() {

    it(`should be curried`,
        function(callback) {
            const curried = timeout(0);
            expect(curried).to.be.a('function');
            expect( curried( waitfor(callback) ) ).to.be.a('function');
        }
    )

    it(`should return a function`,
        function (callback) {
            expect( timeout(0, waitfor(callback)) ).to.be.a('function');
        }
    )

    it(`should throw if its second argument is not a function`,
        function (callback) {
            expect( () => timeout(0, {}) ).to.throw();
            callback();
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