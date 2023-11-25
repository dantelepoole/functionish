const trycatch = require('../src/trycatch');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }
const testargs = [42, 'fubar', UNIQTHING];

const collect = sinon.fake( (...args) => args );
const raise = sinon.fake(msg => { throw new Error(msg) });
const onerror = sinon.fake( (...args) => args );

describe( 'trycatch()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
            raise.resetHistory();
            onerror.resetHistory();
        })
        
        it('should return a function', function() {
            expect( trycatch(onerror, raise) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            
            expect( trycatch ).to.throw;
            expect( () => trycatch(null,UNIQTHING) ).to.throw;
        })

        describe( 'The result function', function() {

            it('should pass its arguments to the target function', function() {

                expect(collect.callCount).to.equal(0);
                expect(raise.callCount).to.equal(0);

                const trycollect = trycatch(onerror, collect);
                trycollect(...testargs);
                expect(collect.callCount).to.equal(1);
                expect(collect.args[0]).to.deep.equal(testargs);

                const tryraise = trycatch(onerror, raise);
                tryraise(...testargs);
                expect(raise.callCount).to.equal(1);
                expect(raise.args[0]).to.deep.equal(testargs);
            })

            it(`should return the target function's return value`, function() {

                expect(collect.callCount).to.equal(0);

                const trycollect = trycatch(onerror, collect);
                const retval = trycollect(...testargs);
                expect(retval).to.deep.equal(testargs);
            })

            it('should not run the error handler if the target function returns', function() {

                expect(collect.callCount).to.equal(0);
                expect(onerror.callCount).to.equal(0);
                
                const trycollect = trycatch(onerror, collect);
                trycollect(...testargs);
                expect(collect.callCount).to.equal(1);
                expect(onerror.callCount).to.equal(0);
            })

            it('should run the error handler if the target function throws', function() {

                expect(raise.callCount).to.equal(0);
                expect(onerror.callCount).to.equal(0);
                
                const tryraise = trycatch(onerror, raise);
                tryraise(...testargs);
                expect(raise.callCount).to.equal(1);
                expect(onerror.callCount).to.equal(1);
            })

            it('should pass the thrown value, the targetfunc and its arguments to the error handler', function() {

                const tryraise = trycatch(onerror, raise);
                tryraise(...testargs);

                const onerrorargs = onerror.args[0];
                expect(onerrorargs[0]).to.be.instanceof(Error);
                expect(onerrorargs[1]).to.equal(raise);
                expect(onerrorargs[2]).to.deep.equal(testargs);
            })

            it(`should return the error handler's value if the error handler is not a function`, function() {

                const tryraise = trycatch(UNIQTHING, raise);
                const retval = tryraise(...testargs);

                expect(retval).to.deep.equal(UNIQTHING);
            })
        })
    }
);