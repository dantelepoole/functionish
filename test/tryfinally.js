const tryfinally = require('../src/tryfinally');
const id = require('../src/id');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }
const testargs = [42, 'fubar', UNIQTHING];

const collect = sinon.fake( (...args) => args );
const raise = sinon.fake(msg => { throw new Error(msg) });
const onfinally_id = sinon.fake(id)
const onfinally_collect = sinon.fake( (...args)=>args );
const onfinally_uniqthing = sinon.fake( () => UNIQTHING );
const onfinally_customthrow = sinon.fake( () => { throw new Error('the finally handler threw') });
const onfinally_always = sinon.fake( x => () => x );

const initcalllog = array => func => (...args) => (array.push(func), func(...args));

describe( 'tryfinally()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
            raise.resetHistory();
            onfinally_id.resetHistory();
            onfinally_collect.resetHistory();
            onfinally_uniqthing.resetHistory();
            onfinally_customthrow.resetHistory();
            onfinally_always.resetHistory();
        })
        
        it('should return a function', function() {
            expect( tryfinally(onfinally_collect, raise) ).to.be.a('function');
        })

        it('should throw if the finally handler is not a function', function() {
            
            expect( () => tryfinally(null,collect) ).to.throw();
            expect( () => tryfinally({},collect) ).to.throw();
            expect( () => tryfinally('fubar',collect) ).to.throw();
            expect( () => tryfinally(UNIQTHING,collect) ).to.throw();
        })

        it('should throw if the target function is not a function', function() {
            
            expect( () => tryfinally(onfinally_collect,null) ).to.throw();
            expect( () => tryfinally(onfinally_collect,{}) ).to.throw();
            expect( () => tryfinally(onfinally_collect,'fubar') ).to.throw();
            expect( () => tryfinally(onfinally_collect,UNIQTHING) ).to.throw();
        })

        describe( 'The result function', function() {

            it('should pass its arguments to the target function', function() {

                expect(collect.callCount).to.equal(0);
                expect(raise.callCount).to.equal(0);

                const trycollect = tryfinally(onfinally_collect, collect);
                trycollect(...testargs);
                expect(collect.callCount).to.equal(1);
                expect(collect.args[0]).to.deep.equal(testargs);

                const tryraise = tryfinally(onfinally_collect, raise);
                tryraise(...testargs);
                expect(raise.callCount).to.equal(1);
                expect(raise.args[0]).to.deep.equal(testargs);
            })

            it(`should always call the finally handler subsequent to calling the target function and pass two arguments`, function() {

                const calllog = [];
                const log = initcalllog(calllog);

                expect(collect.callCount).to.equal(0);
                expect(raise.callCount).to.equal(0);
                expect(onfinally_collect.callCount).to.equal(0);

                const trycollect = tryfinally(log(onfinally_collect), log(collect));
                trycollect(...testargs);
                expect(collect.callCount).to.equal(1);
                expect(onfinally_collect.callCount).to.equal(1);
                expect(onfinally_collect.args[0]).to.have.length(2);
                expect(calllog).to.deep.equal( [collect, onfinally_collect] );

                calllog.length = 0;

                const tryraise = tryfinally(log(onfinally_collect), log(raise));
                tryraise(...testargs);
                expect(raise.callCount).to.equal(1);
                expect(onfinally_collect.callCount).to.equal(2);
                expect(onfinally_collect.args[1]).to.have.length(2);
                expect(calllog).to.deep.equal( [raise, onfinally_collect] );
            })

            it('should throw if the finally handler throws', function() {

                const trycollect = tryfinally(onfinally_customthrow, collect);
                expect( () => trycollect(...testargs) ).to.throw();
            })
        })

        describe( 'If the target function returns, the result function', function() { 

            it('should pass undefined as the first argument to the finally handler', function() {

                const trycollect = tryfinally(onfinally_collect, collect);
                trycollect(...testargs);
                expect(onfinally_collect.args[0][0]).to.be.undefined;
            })

            it('should pass the return value as the second argument to the finally handler', function() {

                const trycollect = tryfinally(onfinally_collect, collect);
                trycollect(...testargs);
                expect(onfinally_collect.args[0][0]).to.be.undefined;
                expect(onfinally_collect.args[0][1]).to.deep.equal(testargs);
            })

            it(`should return the finally handler's return value`, function() {

                const trycollect = tryfinally(onfinally_collect, collect);
                
                const retval = trycollect(...testargs);
                expect(retval).to.deep.equal( [undefined, testargs] );
            })

            it(`should return (not throw) the finally handler's return value if it is an Error instance`, function() {

                const trycollect = tryfinally(onfinally_collect, collect);
                
                expect( () => trycollect( new Error() ) ).not.to.throw();
                
                let retval;

                try {
                    retval = trycollect( new Error() );
                } catch(error) {
                    // noop
                }

                expect(retval[1][0]).to.be.instanceof(Error);
            })

            it(`should not throw if the finally handler's return value is null or undefined`, function() {

                const trycollect_null = tryfinally(onfinally_always(null), collect);
                const trycollect_undefined = tryfinally(onfinally_always(undefined), collect);

                expect( trycollect_null ).not.to.throw();
                expect( trycollect_undefined ).not.to.throw();
                
                let retval;

                try {
                    retval = trycollect_null(...testargs);
                } catch(error) {
                    // noop
                }

                expect(retval).to.be.null;

                try {
                    retval = trycollect_undefined(...testargs);
                } catch(error) {
                    // noop
                }

                expect(retval).to.be.undefined;
            })

        })

        describe( 'If the target function throws, the result function', function() { 

            it('should pass the thrown value as the first argument to the finally handler', function() {

                const tryraise = tryfinally(onfinally_collect, raise);
                tryraise(...testargs);
                expect(onfinally_collect.args[0][0]).to.be.instanceof(Error);
            })

            it('should pass undefined as the second argument to the finally handler', function() {

                const tryraise = tryfinally(onfinally_collect, raise);
                tryraise(...testargs);
                expect(onfinally_collect.args[0][1]).to.be.undefined;
            })

            it('should rethrow the thrown value if the finally handler returns it', function() {

                const tryraise = tryfinally(onfinally_id, raise);
                expect( () => tryraise(...testargs) ).to.throw();
                
            })

            it(`should return the finally handler's return value if it is not the thrown value`, function() {

                const tryraise = tryfinally(onfinally_uniqthing, raise);
                
                const retval = tryraise(...testargs);
                expect(retval).to.deep.equal( UNIQTHING );
            })

        })
    }
);