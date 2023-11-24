const partial = require('../src/partial');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING' }

const collect = sinon.fake( (...args) => args );

describe( 'partial()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
        })
        
        it('should return a function', function() {
            expect( partial(collect, UNIQTHING) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {

            expect(partial).to.throw;
            expect(() => partial(UNIQTHING) ).to.throw;
            expect(() => partial(null) ).to.throw;
        })

        describe( 'The result function', function() {

            it('call the target function with the partial arguments followed by its own arguments', function() {

                const collectpartial = partial(collect, UNIQTHING);

                collectpartial(42);
                expect(collect.callCount).to.equal(1);
                expect(collect.args[0]).to.be.deep.equal( [UNIQTHING, 42] );
            })

            it(`should return the target function's return value`, function() {

                const collectpartial = partial(collect, UNIQTHING);

                const retval = collectpartial(42);

                expect(retval).to.be.deep.equal( [UNIQTHING, 42] );
            })

        })
    }
);