const fallback = require('../src/fallback');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const id = sinon.fake(x => x);
const uniqthing = sinon.fake( ()=>UNIQTHING );
const raiseerror = sinon.fake( () => { throw new Error() });

describe( 'fallback()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            id.resetHistory();
            uniqthing.resetHistory();
            raiseerror.resetHistory();
        })

        it('should return a function', function() {
            expect( fallback(id, raiseerror, uniqthing) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it('should call each target function in order until it receives a non-null/undefined return value', function() {
                
                const withfallback = fallback(id, raiseerror, uniqthing);

                expect(id.callCount).to.equal(0);
                expect(raiseerror.callCount).to.equal(0);
                expect(uniqthing.callCount).to.equal(0);

                withfallback();

                expect(id.callCount).to.equal(1);
                expect(raiseerror.callCount).to.equal(1);
                expect(uniqthing.callCount).to.equal(1);

                withfallback(UNIQTHING);

                expect(id.callCount).to.equal(2);
                expect(raiseerror.callCount).to.equal(1);
                expect(uniqthing.callCount).to.equal(1);

            })

            it('should pass its arguments to each target function it calls', function() {
                
                const withfallback = fallback(id, raiseerror, uniqthing);

                withfallback(null, 42, 'fallback', UNIQTHING);

                expect(id.args[0]).to.deep.equal( [null,42,'fallback', UNIQTHING] );
                expect(raiseerror.args[0]).to.deep.equal( [null,42,'fallback', UNIQTHING] );
                expect(uniqthing.args[0]).to.deep.equal( [null,42,'fallback', UNIQTHING] );

            })

            it(`should return the last target function's return value if all functions throw or return null/undefined`, function() {
                
                const withfallback = fallback(id, raiseerror, uniqthing);

                const retval = withfallback(null, 42, 'fallback', UNIQTHING);

                expect(retval).to.equal(UNIQTHING);

            })

            it('should throw if the last function throws', function() {
                
                const withfallback = fallback(id, raiseerror);

                expect( withfallback ).to.throw;
            })

            it('should return its first argument if no target functions were passed to fallback()', function() {
              
                const withfallback = fallback();

                expect( withfallback(UNIQTHING) ).to.equal(UNIQTHING);
                expect( withfallback(null, 42) ).to.be.null;
                expect( withfallback('fubar', UNIQTHING, 42) ).to.equal('fubar');
            })
        })
    }
);