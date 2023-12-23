const recursive = require('../src/recursive');
const expect = require('chai').expect;
const sinon = require("sinon");

const recursivesum = sinon.fake(

    function recursivesum(total, index, numbers) {

        return (index < numbers.length)
             ? this(total + numbers[index], index+1, numbers)
             : total;
    }
)

const isrecursefunction = func => (typeof func === 'function' && func.name === 'recurse');

describe( 'recursive()', function() {

        beforeEach(function () {
            sinon.resetHistory();
            recursivesum.resetHistory();
        })

        it('should return a function', function() {
            expect( recursive(recursivesum, 0, 0) ).to.be.a('function');
        })

        it('should throw if the target function is not a function', function() {
            expect( () => recursive() ).to.throw();
            expect( () => recursive(42) ).to.throw();
        })

        it('should throw if the target function is already bound to a this-value', function() {

            const boundrecursivesum = recursivesum.bind({});

            expect( () => recursive(boundrecursivesum, 0, 0) ).to.throw();
        })

        describe( 'The result function', function() {

            it('should invoke the target function at least once', function() {
                
                const sum = recursive(recursivesum, 0, 0);
                sum( [] );

                expect(recursivesum.callCount).to.equal(1);
            })

            it(`should pass the partial arguments passed to recursive() to the target function on the first call`, function() {
                
                const sum = recursive(recursivesum, 0, 0);

                sum( [1,2,3,4,5] );
                expect( recursivesum.args[0] ).to.deep.equal( [0, 0, [1,2,3,4,5]] );
                expect( recursivesum.args.slice(1).some( params => params[0] === 0 && params[1] === 0 ) ).to.be.false;
            })

            it(`should always call the target function with its this-value bound to a function named 'recurse'`, function() {
                
                const sum = recursive(recursivesum, 0, 0);

                sum( [1,2,3,4,5] );
                expect( recursivesum.thisValues.every(isrecursefunction) ).to.be.true;
            })

            it('should invoke the target function once for each recursion-iteration', function() {
                
                const sum = recursive(recursivesum, 0, 0);
                sum( [1,2,3,4,5] );

                expect(recursivesum.callCount).to.equal(6);
            })

            it(`should return the target function's return value when the stop condition is met`, function() {
                
                const sum = recursive(recursivesum, 0, 0);

                let retval = sum( [1,2,3,4,5] );
                expect(retval).to.equal(15);

                retval = sum( [] );
                expect(retval).to.equal(0);
            })
        })
    }
);
