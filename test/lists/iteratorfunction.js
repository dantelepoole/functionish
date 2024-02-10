const iteratorfunction = require('../../src/lists/iteratorfunction');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

describe('lists/iteratorfunction()', function() {

    it.skip('should return a function',
        function() {
            should.return.a.function(iteratorfunction, [1,2,3,4,5]);
        }
    )

})