const iterator = require('../../src/lists/iterator');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

describe('lists/iterator()', function() {

    it('should return an object',
        function() {
            should.return.an.object(iterator, [1,2,3,4,5]);
            // should.be.an.object(iterator([1,2,3,4,5]));
            // const result = iterator([1,2,3,4,5]);
            // should.be('object', typeof result);
            // should.be.an.object(result);
        }
    )

    it('should throw if the list has no @@iterator method',
        function() {
            should.throw(iterator, {});
            should.throw(iterator, null);
            should.throw(iterator, iterator);
            should.throw(iterator);
            should.throw(iterator, { [Symbol.iterator]:'notamethod' });
        }
    )

    it(`should call the list's @@iterator method and return the result`,
        function() {
            
            const ITERATOR_OBJECT = {}
            const __iterator = fake( ()=>ITERATOR_OBJECT );
            const fakelist = { [Symbol.iterator]:__iterator }

            const result = iterator(fakelist);

            should.be(ITERATOR_OBJECT, result);
            should.be.called(__iterator);
        }
    )

})