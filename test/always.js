const always = require('../src/always');
const expect = require('chai').expect;

const sentinel = Object.freeze({});

describe( 'always()', function() {

        it('should return a function',
            function() {
                expect( always() ).to.be.a('function');
            }
        )

        describe( 'The function returned by always()', function() {

            it('should return the first argument passed to always()',
                function() {
                    expect( always(sentinel)() ).to.equal(sentinel);
                }
            )

            it('should ignore any further arguments passed to always()',
                function() {
                    expect( always(sentinel, 42, 'foobar')() ).to.equal(sentinel);
                }
            )

            it('should ignore its own arguments',
                function() {
                    expect( always(sentinel)('foo', 'bar', 42) ).to.equal(sentinel);
                }
            )

            it('should return undefined if no arguments were passed to always()',
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
        })
    }
);