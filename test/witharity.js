const witharity = require('../src/witharity');
const expect = require('chai').expect;
const sinon = require("sinon");

const collect = sinon.fake( (...args) => args );
const raise = sinon.fake( () => { throw new Error() } );

describe( 'witharity()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
            raise.resetHistory();
        })

        it(`should return a function`, function() {
            expect( witharity(collect) ).to.be.a('function');
        })

        it(`should throw if the arity is not an integer of 0 or higher`, function() {
            expect( () => witharity(-1, collect) ).to.throw;
            expect( () => witharity(null, collect) ).to.throw;
            expect( () => witharity(2.42, collect) ).to.throw;
        })

        it(`should throw if the target function is not a function`, function() {
            expect( witharity ).to.throw;
            expect( () => witharity(42) ).to.throw;
        })

        it.skip(`should be curried with unary arity`, function() {
            // to do
        })

        describe( 'The result function', function() {

            it(`should invoke the target function with specified number of arguments`, function() {
                
                expect(collect.callCount).to.be.equal(0);

                let collectwitharity = witharity(3, collect);
                collectwitharity();
                expect(collect.callCount).to.be.equal(1);
                expect(collect.args[0]).to.have.length(3);

                collectwitharity = witharity(0, collect);
                collectwitharity();
                expect(collect.callCount).to.be.equal(2);
                expect(collect.args[1]).to.have.length(0);

                collectwitharity = witharity(5, collect);
                collectwitharity();
                expect(collect.callCount).to.be.equal(3);
                expect(collect.args[2]).to.have.length(5);
            })

            it(`should discard any surplus arguments over and above the arity`, function() {
                
                let collectwitharity = witharity(3, collect);
                collectwitharity(1,2,3,4,5);
                expect(collect.args[0]).to.deep.equal( [1,2,3] );

                collectwitharity = witharity(0, collect);
                collectwitharity(1,2,3);
                expect(collect.args[1]).to.have.length(0);

            })

            it(`should replace missing arguments with an undefined value`, function() {
                
                expect(collect.callCount).to.be.equal(0);

                let collectwitharity = witharity(3, collect);
                collectwitharity();
                expect(collect.args[0]).to.deep.equal([undefined,undefined,undefined]);

                collectwitharity(1,2);
                expect(collect.args[1]).to.deep.equal([1,2,undefined]);

                collectwitharity(1);
                expect(collect.args[2]).to.deep.equal([1,undefined,undefined]);

            })

            it(`should return the target function's return value`, function() {
                
                const collectwitharity = witharity(3, collect);
                const retval = collectwitharity(42);
                expect(retval).to.deep.equal([42,undefined,undefined]);

            })

            it(`should throw if the target function`, function() {
                
                const collectwitharity = witharity(3, collect);
                expect(collectwitharity).to.throw;

            })
        })
    }
);
