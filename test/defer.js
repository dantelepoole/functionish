const defer = require('../src/defer');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const collect = (...args) => args;
const fakecollect = sinon.fake(collect);

describe( 'defer()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakecollect.resetHistory();
        })

        it('should return a function', function() {
            expect( defer(fakecollect, UNIQTHING) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {
                
                expect(fakecollect.callCount).to.be.equal(0);

                const deferredcollect = defer(fakecollect, UNIQTHING);
                deferredcollect();
                expect(fakecollect.callCount).to.be.equal(1);
            })

            it(`should pass the arguments passed to defer() to the target function`, function() {
                
                const deferredcollect = defer(fakecollect, UNIQTHING);
                const retval = deferredcollect();
                expect(retval).to.deep.equal([UNIQTHING]);
            })

            it('should ignore its own arguments', function() {
                
                const deferredcollect = defer(fakecollect);
                const retval = deferredcollect(42);
                expect(retval).to.deep.equal([]);
            })

            it(`should throw if the target function is not a function`, function() {
                
                const deferredcollect = defer(null);
                expect(() => deferredcollect).to.throw;
            })
        })
    }
);