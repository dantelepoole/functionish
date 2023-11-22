const defaultto = require('../src/defaultto');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHIS' }

const id = x => x;
const fakeid = sinon.fake(id);

describe( 'defaultto()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            fakeid.resetHistory();
        })

        it('should return a function', function() {
            expect( defaultto(UNIQTHING, id) ).to.be.a('function');
        })

        it(`should be curried with unary arity`, function() {

            const defaulttouniq = defaultto(UNIQTHING);
            expect(defaulttouniq).to.be.a('function');

            const idwithdefault = defaulttouniq(fakeid);
            expect(idwithdefault).to.be.a('function');
            expect(fakeid.callCount).to.equal(0);
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {
                
                expect(fakeid.callCount).to.be.equal(0);

                const idwithdefault = defaultto(UNIQTHING, fakeid);
                idwithdefault(null);
                expect(fakeid.callCount).to.be.equal(1);

                idwithdefault(undefined);
                expect(fakeid.callCount).to.be.equal(2);
            })

            it('should return the default value if its return value is null', function() {
                
                const idwithdefault = defaultto(UNIQTHING, fakeid);
                const retval = idwithdefault(null);
                expect(retval).to.be.equal(UNIQTHING);
            })

            it('should return the default value if its return value is undefined', function() {
                
                const idwithdefault = defaultto(UNIQTHING, fakeid);
                const retval = idwithdefault(undefined);
                expect(retval).to.be.equal(UNIQTHING);
            })

            it(`should return the target function's return value if it is neither null nor undefined`, function() {
                
                const idwithdefault = defaultto('fubar', fakeid);
                
                let retval = idwithdefault(UNIQTHING);
                expect(retval).to.be.equal(UNIQTHING);
            })
        })
    }
);