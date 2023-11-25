const variadic = require('../src/variadic');
const expect = require('chai').expect;
const sinon = require('sinon');

const testargs = [1,2,3,4,5]; // the sum is 15
const sum = sinon.fake( numbers => numbers.reduce( (a,b) => (a+b), 0) );
const raise = sinon.fake( () => { throw new Error() } );

describe( 'variadic()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            sum.resetHistory();
            raise.resetHistory();
        })

        it('should return a function', function() {
            expect( variadic(sum) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            expect( () => variadic() ).to.throw;
            expect( () => variadic(42) ).to.throw;
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {

                expect(sum.callCount).to.equal(0);

                const variadicsum = variadic(sum);
                variadicsum(...testargs);

                expect(sum.callCount).to.equal(1);
            })

            it('should pass its arguments to the target function as a single array', function() {

                const variadicsum = variadic(sum);
                variadicsum(...testargs);
                expect(sum.args[0]).to.have.length(1);
                expect( sum.args[0][0] ).to.deep.equal(testargs);
            })

            it(`should return the target function's return value`, function() {

                const variadicsum = variadic(sum);
                const retval = variadicsum(...testargs);
                expect(retval).to.equal(15);
            })

            it(`should throw if the target function throws`, function() {

                const variadicraise = variadic(raise);
                expect(variadicraise).to.throw;
            })
        })
    }
);