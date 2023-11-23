const fork = require('../src/fork');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const collect = sinon.fake( (...args) => args );
const id = sinon.fake(x => x);
const fubar = sinon.fake( ()=>'fubar' );
const uniqthing = sinon.fake( ()=>UNIQTHING );

const initcalllog = array => func => (...args) => (array.push(func), func(...args));

describe( 'fork()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
            id.resetHistory();
            fubar.resetHistory();
            uniqthing.resetHistory();
        })
        
        it('should return a function', function() {
            expect( fork(id, fubar, uniqthing) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should throw if any target function is not a function`, function() {
        
                const forkedfunctions = fork(id, fubar, UNIQTHING);
                
                expect(forkedfunctions).to.throw;
            })

            it('should call each target function in order', function() {

                const calllog = [];
                const logcalls = initcalllog(calllog);

                const functionfork = fork( logcalls(id), logcalls(fubar), logcalls(uniqthing) );

                expect(id.callCount).to.equal(0);
                expect(fubar.callCount).to.equal(0);
                expect(uniqthing.callCount).to.equal(0);

                functionfork(UNIQTHING);

                expect(id.callCount).to.equal(1);
                expect(fubar.callCount).to.equal(1);
                expect(uniqthing.callCount).to.equal(1);
                
                expect(calllog).to.deep.equal( [id, fubar, uniqthing] );
            })

            it('should pass its arguments to each target function', function() {

                const functionfork = fork(id, fubar, uniqthing);

                functionfork(42, UNIQTHING, 'fubar');

                expect(id.args[0]).to.deep.equal( [42, UNIQTHING, 'fubar'] );
                expect(fubar.args[0]).to.deep.equal( [42, UNIQTHING, 'fubar'] );
                expect(uniqthing.args[0]).to.deep.equal( [42, UNIQTHING, 'fubar'] );
                
            })

            it(`should return an array holding the target function's return values`, function() {

                const functionfork = fork(id, fubar, uniqthing);

                const retvals = functionfork(42, UNIQTHING, 'fubar');

                expect(retvals).to.deep.equal( [42, 'fubar', UNIQTHING] );
                
            })

            it(`should have a 'join()' method`, function() {

                const functionfork = fork(id, fubar, uniqthing);

                expect(functionfork.join).to.be.a('function');
                
            })

            describe( `The result function's join() method`, function() {

                it('should return a function', function() {
    
                    const forkedfunctions = fork(id, fubar, uniqthing);
                    const forkedandjoinedfunctions = forkedfunctions.join(collect);

                    expect( forkedandjoinedfunctions ).to.be.a('function');
                })
    
                describe( `The join() method's result function`, function() {

                    it('should call the fork functions', function() {
        
                        const forkedfunctions = fork(id, fubar, uniqthing);
                        const forkedandjoinedfunctions = forkedfunctions.join(collect);
                        
                        expect(id.callCount).to.equal(0);
                        expect(fubar.callCount).to.equal(0);
                        expect(uniqthing.callCount).to.equal(0);

                        forkedandjoinedfunctions(42, UNIQTHING, 'fubar');

                        expect(id.callCount).to.equal(1);
                        expect(fubar.callCount).to.equal(1);
                        expect(uniqthing.callCount).to.equal(1);
                    })

                    it('should call the join-function', function() {
        
                        const forkedfunctions = fork(id, fubar, uniqthing);
                        const forkedandjoinedfunctions = forkedfunctions.join(collect);
                        
                        expect( collect.callCount ).to.equal(0);

                        forkedandjoinedfunctions(42, UNIQTHING, 'fubar');

                        expect( collect.callCount ).to.equal(1);
                    })
        
                    it(`should pass the fork functions' return values to the join-function as a rest parameter`, function() {
        
                        const forkedfunctions = fork(id, fubar, uniqthing);
                        const forkedandjoinedfunctions = forkedfunctions.join(collect);
                        
                        forkedandjoinedfunctions(42, UNIQTHING, 'fubar');

                        expect(collect.args[0]).to.deep.equal( [42,'fubar',UNIQTHING] );
                    })

                    it(`should return the return value of the join-function`, function() {
        
                        const forkedfunctions = fork(id, fubar, uniqthing);
                        const forkedandjoinedfunctions = forkedfunctions.join(collect);
                        
                        const retval = forkedandjoinedfunctions(42, UNIQTHING, 'fubar');

                        expect(retval).to.deep.equal( [42,'fubar',UNIQTHING] );
                    })

                    it(`should throw if the join-function is not a function`, function() {
        
                        const forkedfunctions = fork(id, fubar, uniqthing);
                        const forkedandjoinedfunctions = forkedfunctions.join(UNIQTHING);
                        
                        expect(forkedandjoinedfunctions).to.throw;
                    })
                })
            })
        })
    }
);