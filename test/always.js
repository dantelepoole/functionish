const always = require('../always');
const expect = require('chai').expect;

const marker = Object.freeze({});

describe(
    'always()', 
    function() {

        it('should return a function',
            function() {
                expect( always() ).to.be.a('function');
            }
        )

        it('should return its first argument',
            function() {
                expect( always(marker)() ).to.equal(marker);
            }
        )

        it('should only return its first argument',
            function() {
                expect( always(marker, 42)() ).to.equal(marker);
            }
        )

        it('should return a function that ignores its own arguments',
            function() {
                expect( always(marker)('foo', 'bar', 42) ).to.equal(marker);
            }
        )

        it('should return undefined if it is called without arguments',
            function() {
                expect( always()() ).to.be.undefined;
            }
        )

        it('should work with a null argument',
            function() {
                expect( always(null)() ).to.be.null;
            }
        )

        it('should work with an undefined argument',
            function() {
                expect( always(undefined)() ).to.be.undefined;
            }
        )

        it('should work with a NaN argument',
            function() {
                expect( always(NaN)() ).to.be.NaN;
            }
        )
    }
);