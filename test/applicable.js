const applicable = require('../src/applicable');
const expect = require('chai').expect;

const UNIQTHING = {}

const collectargs = (...args) => args;
const countargs = (...args) => args.length;
const id = x => x;

describe( 'applicable()', function() {

        it('should return a function',
            function() {
                expect( applicable() ).to.be.a('function');
            }
        )

        describe( 'The result function', function() {

            it('should call its first argument as a function with the arguments passed to applicable()',
                function() {
                    const apply1 = applicable(UNIQTHING);
                    expect( apply1(id) ).to.equal(UNIQTHING);

                    const apply2 = applicable(UNIQTHING, 42, 'fubar', applicable);
                    expect( apply2(collectargs) )
                        .to.deep.equal( [UNIQTHING,42,'fubar', applicable] );

                    const apply3 = applicable();
                    expect( apply3(countargs) ).to.equal(0);
                    expect( apply2(countargs) ).to.equal(4);
                }
            )

            it('should throw if its argument is not a function',
                function() {
                    const apply1 = applicable(UNIQTHING);
                    expect( () => apply1('not-a-function') ).to.throw;
                }
            )

        })
    }
);
