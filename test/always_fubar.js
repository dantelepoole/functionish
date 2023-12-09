const always = require('../src/always');
const will = require('../lib/test/will');

const UNIQTHING = {}

describe( 'always()', function() {

        it('should return a function', function() {
            
            will.be.a.function()
                (always, 'fubar');
        })

        describe( 'The result function', function() {

            it('should return the first argument passed to always()', function() {
                
                will.be(UNIQTHING)
                    ( always(UNIQTHING, 42, 'fubar') );
            })

            it('should ignore any other arguments passed to always()', function() {
                
                will.be(UNIQTHING)
                    (always, UNIQTHING, UNIQTHING, 42, 'fubar');
            })

            it('should ignore its own arguments', function() {

                will.be(UNIQTHING)
                    ( always(UNIQTHING), 'foo', 'bar', 42 );
            })

            it(`should return 'undefined' if no arguments were passed to always()`, function() {
                
                will.be.undefined() 
                    ( always(), UNIQTHING );
            })
        })
    }
);