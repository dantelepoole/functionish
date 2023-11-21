const always = require('../src/always');
const expect = require('chai').expect;

const UNIQTHING = {}

describe( 'always()', function() {

        it('should return a function',
            function() {
                expect( always() ).to.be.a('function');
            }
        )

        describe( 'The result function', function() {

            it('should return the first argument passed to always()',
                function() {
                    expect( always(UNIQTHING)() ).to.equal(UNIQTHING);
                }
            )

            it('should ignore any other arguments passed to always()',
                function() {
                    expect( always(UNIQTHING, 42, 'foobar')() ).to.equal(UNIQTHING);
                }
            )

            it('should ignore its own arguments',
                function() {
                    expect( always(UNIQTHING)('foo', 'bar', 42) ).to.equal(UNIQTHING);
                }
            )

            it(`should return 'undefined' if no arguments were passed to always()`,
                function() {
                    expect( always()() ).to.be.undefined;
                }
            )
        })
    }
);