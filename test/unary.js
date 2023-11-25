const unary = require('../src/unary');
const expect = require('chai').expect;
const sinon = require("sinon");

const UNIQTHING = { label:'UNIQTHING' }
const collect = sinon.fake( (...args) => args );

describe( 'unary()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            collect.resetHistory();
        })

        it(`should return a function`, function() {
            expect( unary(collect) ).to.be.a('function');
        })

        describe( 'The result function', function() {

            it(`should throw if the target function is not a function`, function() {

                const badunary = unary();
                expect( () => badunary() ).to.throw();
            })

            it(`should invoke the target function with exactly one argument`, function() {
                
                const unarycollect = unary(collect);
                
                unarycollect();
                expect(collect.args[0].length).to.equal(1);

                unarycollect(UNIQTHING);
                expect(collect.args[1].length).to.equal(1);

                unarycollect(UNIQTHING, 'fubar');
                expect(collect.args[2].length).to.equal(1);
            })

            it(`should pass its own first argument to the target function`, function() {
                
                const unarycollect = unary(collect);
                
                unarycollect(UNIQTHING);
                expect(collect.args[0][0]).to.equal(UNIQTHING);

                unarycollect(UNIQTHING, 'fubar');
                expect(collect.args[1][0]).to.equal(UNIQTHING);

            })

            it(`should call the target function with undefined if invoked without arguments`, function() {
                
                const unarycollect = unary(collect);
                
                unarycollect();
                expect(collect.args[0][0]).to.be.undefined;
            })

            it(`should return the target function's return value`, function() {
                
                const unarycollect = unary(collect);
                
                const retval = unarycollect(UNIQTHING);
                expect(retval).to.deep.equal([UNIQTHING]);
            })
        })
    }
);
