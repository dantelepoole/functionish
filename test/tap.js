const expect = require('chai').expect;
const tap = require('../tap');

function sum(a,b) {
    return (a+b);
}

describe.only(`tap()`, function() {

    it(`should return a function`,
        function () {
            expect( tap(sum) ).to.be.a('function');
        }
    )

    describe(`tap()'s returned function`, function () {

        it(`should return its first argument`,
            function() {
                const tappedsum = tap(sum);
                const result = tappedsum(42, 43);
                expect(result).to.be.equal(42);
            }
        )

        it(`should pass its arguments to the function passed to tap()`,
            function() {

                let wasinvoked = false;

                function somefunction(...args) {
                    wasinvoked = true;
                    expect(args).to.be.deep.equal([42, 43]);
                }

                const tappedfunction = tap(somefunction);
                const result = tappedfunction(42,43);
                expect(wasinvoked).to.be.true;
            }
        )

        it(`should prepend the prebound arguments passed to tap() to its own arguments)`,
            function() {

                let wasinvoked = false;

                function somefunction(...args) {
                    wasinvoked = true;
                    expect(args).to.be.deep.equal( [42, 43] );
                }

                const tappedfunction = tap(somefunction, 42);
                tappedfunction(43);
                expect(wasinvoked).to.be.true;
            }
        )
    })
})