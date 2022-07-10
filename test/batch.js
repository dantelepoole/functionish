const batch = require('../src/batch');
const expect = require('chai').expect;
const isiterable = require('../src/isiterable');
const range = require('../src/range');

const sandbox = require('sinon').createSandbox();
const spy = sandbox.spy.bind(sandbox);

function toarray(iterable) {
    expect( isiterable(iterable) ).to.be.true;
    return Array.from(iterable);
}

function countitems(iterable) {

    let count = 0;

    for(const item of iterable) count += 1;

    return count;
}

describe('batch()', function() {

    beforeEach(
        function() {
            sandbox.resetHistory();
        }
    )

    it('should be curried with binary arity',
        function () {
            const curried = batch(5);
            expect(curried).to.be.a('function');
            expect( curried(range(10)) ).to.be.an('object');
        }
    )

    it('should return an iterable',
        function () {
            expect( isiterable( batch(2, range(10)) ) ).to.be.true;
        }
    )

    describe('the iterable returned by batch()', function() {

        it('should produce arrays with the specified batch size',
            function () {
                
                let itemcount = 0;

                for(const item of batch(2, range(10))) {
                    expect( item ).to.be.an('array').with.length(2);
                    itemcount += 1;
                }

                expect(itemcount).to.be.equal(5);
            }
        )

        it('should produce a final array with any remaining items, even if less than the batch size',
            function () {
                const batches = Array.from( batch(3, range(10) ) );
                expect(batches).to.be.an('array').with.length(4);
                expect(batches[3]).to.be.an('array').with.length(1);
            }
        )

        it('should produce batches with a combined length equal to number of items produced by the iterable',
            function () {
                const batches = Array.from( batch(3, range(25) ) );
                const itemcounter = (acc,batch) => (acc + batch.length);
                const itemcount = batches.reduce(itemcounter, 0);
                expect(itemcount).to.be.equal(25);
            }
        )

        it('should coerce the batchsize argument to a minimum value of 1',
            function () {
                const batchcount = countitems( batch(0, range(13) ) );
                expect(batchcount).to.be.equal(13);
            }
        )

        it('should throw if the batch size is not a number',
            function () {
                expect( () => batch('foobar', range(5)) ).to.throw();
            }
        )

        it('should throw if the batch size is NaN',
            function () {
                expect( () => batch(NaN, range(5)) ).to.throw();
            }
        )

        it('should throw if the iterable is not iterable',
            function () {
                expect( () => batch(5, {}) ).to.throw();
            }
        )

        it('should produce a single batch if its batchsize argument is greater than the number of items produced by the iterable',
            function () {
                const batches = Array.from( batch(10, range(5)) );
                expect(batches.length).to.be.equal(1);
                expect(batches[0]).to.be.an('array').with.length(5);
            }
        )

    })
})