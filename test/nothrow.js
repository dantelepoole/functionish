const nothrow = require('../src/nothrow');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING'}

const collectargs = sinon.fake( (...args) => args );
const throwerror = sinon.fake( (msg='Error') => { throw new Error(msg) } );

describe( 'nothrow()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collectargs.resetHistory();
            throwerror.resetHistory();
        })

        it(`should return a function`, function() {
            expect( nothrow(collectargs) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should call the target function`, function() {

                const nothrowcollectargs = nothrow(collectargs);
                const nothrowthrowerror = nothrow(throwerror);

                expect(collectargs.callCount).to.be.equal(0);
                expect(throwerror.callCount).to.be.equal(0);

                nothrowcollectargs(42, 'fubar', UNIQTHING);
                nothrowthrowerror(42, 'fubar', UNIQTHING);

                expect(collectargs.callCount).to.be.equal(1);
                expect(throwerror.callCount).to.be.equal(1);
            })

            it(`should return a single-element array holding the target function's return value if the target function returns`, function() {

                const nothrowfunc = nothrow(collectargs);

                const result = nothrowfunc(42, 'fubar', UNIQTHING);
                expect(result.length).to.equal(1);
                expect(result[0]).to.deep.equal( [42,'fubar',UNIQTHING] );
            })

            it(`should return a two-element array holding 'undefined' in the first element and the thrown error in the second element if the target function throws`, function() {

                const nothrowthrowerror = nothrow(throwerror);

                const result = nothrowthrowerror('fubar');

                expect(result.length).to.equal(2);
                expect(result[0]).to.be.undefined;
                expect(result[1]).to.be.instanceOf(Error);
                expect(result[1].message).to.be.equal('fubar');
            })

            it(`should return an error if the target function is not a function`, function() {

                const nothrowthrowerror = nothrow();

                const result = nothrowthrowerror('fubar');
                
                expect(result.length).to.equal(2);
                expect(result[0]).to.be.undefined;
                expect(result[1]).to.be.instanceOf(Error);
            })

            it(`should pass its own arguments to the target function`, function() {
                
                const nothrowcollectargs = nothrow(collectargs);

                nothrowcollectargs(42, 'fubar', UNIQTHING);
                expect(collectargs.args[0]).to.be.deep.equal([42, 'fubar', UNIQTHING]);

            })

            it(`should return the target function's return value`, function() {
                
                const nothrowcollectargs = nothrow(collectargs);

                const result = nothrowcollectargs(42, 'fubar', UNIQTHING);
                expect(result).to.be.deep.equal( [ [42, 'fubar', UNIQTHING] ] );
            })
        })
    }
);
