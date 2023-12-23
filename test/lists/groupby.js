const groupby = require('../../src/lists/groupby');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const numbers1to5 = Object.freeze([1,2,3,4,5]);

const oddoreven = fake(x => (x % 2) === 0 ? 'even' : 'odd');

describe('lists/groupby()', function() {

    beforeEach(
        function() {
            oddoreven.resetHistory();
        }
    )

    it('should be curried with unary arity',
        function() {
            should.return.a.function(groupby, oddoreven)
            should.return.type.object(groupby(oddoreven), numbers1to5);
        }
    )

    it('should throw if the key selector is not a function',
        function() {
            should.throw(groupby, null, numbers1to5)
            should.throw(groupby, {}, numbers1to5);
            should.throw(groupby, 'fubar', numbers1to5);
        }
    )

    it('should throw if the list is not iterable',
        function() {
            should.throw(groupby, oddoreven, {});
            should.throw(groupby, oddoreven, null);
            should.throw(groupby, oddoreven, groupby);
        }
    )

    it(`should call the key selector for each item in the list`,
        function() {

            should.not.be.called(oddoreven);

            groupby(oddoreven, numbers1to5);

            should.be(numbers1to5.length, oddoreven.callCount);

            for(let i=0; i < numbers1to5.length; i += 1) should.be(numbers1to5[i], oddoreven.args[i][0]);
        }
    )

    describe('The object returned by groupby()', function() {
    
        it('should have no own properties if the list is empty, without calling the key selector', function() {
            
            should.not.be.called(oddoreven);

            const groups = groupby(oddoreven, []);

            should.be.empty( Object.keys(groups) );
            should.not.be.called(oddoreven);
        })

        it('should have an own property for each key', function() {

            const groups = groupby(oddoreven, numbers1to5);
            should.be.an.Array( groups.even );
            should.be.an.Array( groups.odd );

            should.be.undefined( groupby(oddoreven, [2,4,6]).odd );
            should.be.undefined( groupby(oddoreven, [1,3,5]).even );
        })

        it('should group each item in the source list according to its key', function() {

            const groups = groupby(oddoreven, numbers1to5);

            should.be.like( [2,4], groups.even );
            should.be.like( [1,3,5], groups.odd );

        })

    });

});