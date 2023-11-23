const flip = require('../src/flip');
const expect = require('chai').expect;
const sinon = require('sinon');

const UNIQTHING = { label:'UNIQTHING' }

const collect = sinon.fake( (...args) => args );

describe( 'flip()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
        })
        
        it('should return a function', function() {
            expect( flip(collect) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            
            expect( flip ).to.throw;
            expect( () => flip(UNIQTHING) ).to.throw;
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {

                expect(collect.callCount).to.equal(0);

                const flippedcollect = flip(collect);
                flippedcollect(42, UNIQTHING);
                
                expect(collect.callCount).to.equal(1);
            })

            it('should swap its first two arguments before passing them to the target function', function() {
                
                const flippedcollect = flip(collect);

                const retval = flippedcollect(42, UNIQTHING);
                
                expect(collect.args[0]).to.deep.equal( [UNIQTHING, 42] );
            })

            it(`should pass any further arguments in their original order`, function() {

                const flippedcollect = flip(collect);

                const retval = flippedcollect(42, UNIQTHING, 'foo', 'bar');
                
                expect(collect.args[0]).to.deep.equal( [UNIQTHING, 42, 'foo', 'bar'] );
            })

            it(`should be curried with unary arity`, function() {

                const flippedcollect = flip(collect);

                expect(collect.callCount).to.equal(0);

                const unaryflippedcollect = flippedcollect(42);
                expect(unaryflippedcollect).to.be.a('function');
                expect(collect.callCount).to.equal(0);

                const retval = unaryflippedcollect(UNIQTHING, 'fubar');
                expect(retval).to.deep.equal( [UNIQTHING,42,'fubar']);
                expect(collect.callCount).to.equal(1);
            })
        })
    }
);