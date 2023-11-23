const cstyle = require('../src/cstyle');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING'}

const collectargs = sinon.fake( (...args) => args );
const throwerror = sinon.fake( (msg='Error') => { throw new Error(msg) } );

describe( 'cstyle()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collectargs.resetHistory();
            throwerror.resetHistory();
        })

        it(`should return a function`, function() {
            expect( cstyle(collectargs) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should call the target function`, function() {

                const nothrowcollectargs = cstyle(collectargs);
                const nothrowthrowerror = cstyle(throwerror);

                expect(collectargs.callCount).to.be.equal(0);
                expect(throwerror.callCount).to.be.equal(0);

                nothrowcollectargs(42, 'fubar', UNIQTHING);
                nothrowthrowerror(42, 'fubar', UNIQTHING);

                expect(collectargs.callCount).to.be.equal(1);
                expect(throwerror.callCount).to.be.equal(1);
            })

            it(`should return the target function's return value if the target function returns`, function() {

                const nothrowfunc = cstyle(collectargs);

                const result = nothrowfunc(42, 'fubar', UNIQTHING);
                expect(result).to.deep.equal( [42,'fubar',UNIQTHING] );
            })

            it(`should return the thrown value if the target function throws`, function() {

                const nothrowthrowerror = cstyle(throwerror);

                const result = nothrowthrowerror('fubar');

                expect(result).to.be.instanceOf(Error);
                expect(result.message).to.be.equal('fubar');
            })

            it(`should return an error if the target function is not a function`, function() {

                const nothrowthrowerror = cstyle();

                const result = nothrowthrowerror('fubar');
                
                expect(result).to.be.instanceOf(Error);
            })

            it(`should pass its own arguments to the target function`, function() {
                
                const nothrowcollectargs = cstyle(collectargs);

                nothrowcollectargs(42, 'fubar', UNIQTHING);
                expect(collectargs.args[0]).to.be.deep.equal([42, 'fubar', UNIQTHING]);

            })
        })
    }
);
