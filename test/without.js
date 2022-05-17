const without = require('../without');
const expect = require('chai').expect;

describe.only('without()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with binary arity',
        function () {
            const curried = without(['foo','bar']);
            expect( curried ).to.be.a('function');
            expect( curried(['foo','bar']) ).to.be.an('array');
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
            expect( without(obj, ['foo','bar','baz']) ).to.be.an('array');
        }
    )

    it('should throw if its first argument is not iterable',
        function () {
            expect( ()=>without({}, ['foo','bar','baz']) ).to.throw();
        }
    )

    describe('if its second argument is an array', function() {

        it('it should return a separate array without the items contained in the first argument',
            function () {
                const obj = {
                    [Symbol.iterator] : function* () {
                        yield 'foo';
                        yield 'bar';
                    }
                }
                const list = ['foo','baz','bar'];
                let result = without(obj, list)
                expect(result).to.be.deep.equal(['baz']);
                expect(result).not.to.be.equal(list);

                result = without(['foo','bar'], list);
                expect(result).to.be.deep.equal(['baz']);
                expect(result).not.to.be.equal(list);

                result = without(['foo','bar'], []);
                expect(result).to.be.deep.equal([]);
                expect(result).not.to.be.equal(list);

                result = without([], ['foo','baz','bar']);
                expect(result).to.be.deep.equal(['foo', 'baz', 'bar']);
                expect(result).not.to.be.equal(list);
            }
        )
    })

    describe('if its second argument is an object', function() {

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

    describe('if its second argument is neither an array nor an object', function() {

        it('it should return the second argument itself',
            function () {
                expect( without(['foo','bar'], 42)).to.be.equal(42);
                expect( without(['foo','bar'], 'foobar')).to.be.equal('foobar');
                expect( without(['foo','bar'], false)).to.be.equal(false);
                expect( without(['foo','bar'], null)).to.be.null;
                expect( without(['foo','bar'], undefined)).to.be.undefined;
                expect( without(['foo','bar'], NaN)).to.be.NaN;
                expect( without(['foo','bar'], 42n)).to.be.equal(42n);
                expect( without(['foo','bar'], without)).to.be.equal(without);
            }
        )
    })
})