const once = require('../src/once');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = {}

const collectargs = sinon.fake( (...args) => args );

describe( 'once()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collectargs.resetHistory();
        })
        
        it('should return a function', function() {
            expect( once(collectargs) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it('should pass its arguments to the target function on the first call', function() {

                expect(collectargs.callCount).to.equal(0);

                const collectargsonce = once(collectargs);
                const retval = collectargsonce(UNIQTHING, 'fubar', 42);

                expect(collectargs.callCount).to.equal(1);
                expect(retval).to.deep.equal( [UNIQTHING,'fubar',42] );
                expect(collectargs.args[0]).to.deep.equal( [UNIQTHING,'fubar',42] );

            })

            it('should not call the target function on subsequent calls', function() {

                const collectargsonce = once(collectargs);
                
                collectargsonce(UNIQTHING);
                expect(collectargs.callCount).to.equal(1);
                
                collectargsonce(42);
                expect(collectargs.callCount).to.equal(1);

                collectargsonce();
                expect(collectargs.callCount).to.equal(1);
            })

            it('should always return the initial return value on subsequent calls regardless of its arguments', function() {
                
                const collectargsonce = once(collectargs);
                
                let retval = collectargsonce(UNIQTHING);
                expect(retval).to.deep.equal([UNIQTHING]);
                
                retval = collectargsonce(42);
                expect(retval).to.deep.equal([UNIQTHING]);

                retval = collectargsonce();
                expect(retval).to.deep.equal([UNIQTHING]);
            })
        })
    }
);