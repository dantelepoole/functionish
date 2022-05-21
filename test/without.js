const without = require('../without');
const expect = require('chai').expect;

describe('without()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with binary arity',
        function () {
            const curried = without(['foo','bar']);
            expect( curried ).to.be.a('function');
            expect( curried({foo:'foo', bar:'bar'}) ).to.be.an('object');
        }
    )

    it('should accept an iterable for its first argument',
        function () {
            const obj = {
                [Symbol.iterator] : function* () {
                    yield 'foo';
                    yield 'bar';
                }
            }
            expect( without(obj, {foo:'foo', bar:'bar'}) ).to.be.an('object');
        }
    )

    it('should throw if its first argument is not iterable',
        function () {
            expect( ()=>without({}, {}) ).to.throw();
        }
    )

    it('it should return a separate object without the keys contained in the first argument',
        function () {
            const obj = {
                foo: 'foo',
                bar: 'bar',
                baz: 'baz'
            }

            let result = without(['foo','bar'], obj);
            expect(result).to.be.deep.equal({baz:'baz'});
            expect(result).not.to.be.equal(obj);

            result = without([], obj);
            expect(result).to.be.deep.equal(obj);
            expect(result).not.to.be.equal(obj);

            result = without(['foo','bar'], {});
            expect(result).to.be.deep.equal({});
        }
    )
})
