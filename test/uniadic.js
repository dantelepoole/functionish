const uniadic = require('../src/uniadic');
const expect = require('chai').expect;
const sinon = require('sinon');

const testargs = [1,2,3,4,5]; // the sum is 15
const sum = sinon.fake( (...numbers) => numbers.reduce( (a,b) => (a+b), 0) );
const raise = sinon.fake( () => { throw new Error() } );

describe( 'uniadic()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            sum.resetHistory();
            raise.resetHistory();
        })

        it('should return a function', function() {
            expect( uniadic(sum) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            expect( () => uniadic() ).to.throw();
            expect( () => uniadic(42) ).to.throw();
        })

        describe( 'The result function', function() {

            it('should call the target function', function() {

                expect(sum.callCount).to.equal(0);

                const uniadicsum = uniadic(sum);
                uniadicsum(testargs);

                expect(sum.callCount).to.equal(1);
            })

            it('should pass its iterable first argument to the target function as a spread parameter', function() {

                const uniadicsum = uniadic(sum);
                uniadicsum(testargs);
                expect( sum.args[0].length ).to.equal(testargs.length);
            })

            it('should ignore any further arguments after the first one', function() {

                const uniadicsum = uniadic(sum);
                uniadicsum(testargs, 42, 'fubar');
                expect( sum.args[0].length ).to.equal(testargs.length);
            })

            it(`should return the target function's return value`, function() {

                const uniadicsum = uniadic(sum);
                const retval = uniadicsum(testargs);
                expect(retval).to.equal(15);
            })

            it(`should throw if the target function throws`, function() {

                const uniadicraise = uniadic(raise);
                expect(uniadicraise).to.throw();
            })
        })
    }
);