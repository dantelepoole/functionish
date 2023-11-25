const tap = require('../src/tap');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = {}

const collect = sinon.fake( (...args)=>args );

describe( 'tap()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
        })
        
        it('should return a function', function() {
            expect( tap(collect) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            expect( ()=>tap() ).to.throw;
            expect( ()=>tap(null) ).to.throw;
            expect( ()=>tap(42) ).to.throw;
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {
                
                const tappedcollect = tap(collect);

                expect(collect.callCount).to.equal(0);

                tappedcollect(UNIQTHING, 42, 'fubar');
                
                expect(collect.callCount).to.equal(1);
            })

            it('should pass its arguments to the target function', function() {
                
                const tappedcollect = tap(collect);

                tappedcollect(UNIQTHING, 42, 'fubar');

                expect(collect.args[0]).to.deep.equal( [UNIQTHING,42,'fubar'] );
            })

            it('should return its own first argument', function() {
                
                const tappedcollect = tap(collect);

                const retval = tappedcollect(UNIQTHING, 42, 'fubar');

                expect(retval).to.equal(UNIQTHING);
            })

            it('should return undefined if called without arguments', function() {
                
                const tappedcollect = tap(collect);

                const retval = tappedcollect();

                expect(retval).to.be.undefined;
            })
        })
    }
);