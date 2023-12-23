const includes = require('../../src/lists/includes');
const fake = require('sinon').fake;
const should = require('../../lib/test/should');

const UNIQTHING = { label:'UNIQTHING' }

describe('lists/includes()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with unary arity',
        function() {
            should.return.a.function(includes, UNIQTHING)
            should.return.false( includes(UNIQTHING), [] );
        }
    )

    it(`should throw if the list has no 'includes()' method and is not iterable`,
        function() {
            should.throw(includes, null, {})
            should.throw(includes, {}, 42);
            should.throw(includes, {}, 0);
        }
    )

    it(`should pass the target value to the list's includes() method if it has one`,
        function() {
            
            const list = { includes:fake(x => x) }

            should.return(UNIQTHING, includes, UNIQTHING, list);

            should.be.called(list.includes);
            should.be.called.with([UNIQTHING], list.includes);
        }
    )

    it(`should return true if the list contains an item strictly equal to the target value`,
        function() {
            should.return.true(includes, UNIQTHING, [42, 'fubar', UNIQTHING, null]);
            should.return.true(includes, UNIQTHING, [UNIQTHING]);
        }
    )

    it(`should return false if the list contains no items that are strictly equal to the target value`,
        function() {
            should.return.false(includes, UNIQTHING, [42, 'fubar', null]);
            should.return.false(includes, UNIQTHING, []);
        }
    )
})