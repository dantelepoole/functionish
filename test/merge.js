const expect = require('chai').expect;
const merge = require('../src/merge');

describe(`merge()`, function() {

    beforeEach(
        function() {

        }
    )

    it(`should return a new object that contains copies of all own, enumerable properties of each source`,
        function () {
            const obj1 = { a:'a', b:'b' };
            const obj2 = { c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expect( ['a','b','c','d'], Object.keys(merged) ).to.deep.equal(Object.keys(merged));
            expect('a').to.equal(merged.a);
            expect('b').to.equal(merged.b);
            expect('c').to.equal(merged.c);
            expect('d').to.equal(merged.d);

            expect(merged, obj1).not.to.be.equal(obj1);
            expect(merged, obj2).not.to.be.equal(obj2);
        }
    )

    it(`if multiple sources have a property with the same key, it should copy the property from the last source`,
        function () {
            const obj1 = { a:'a', b:'b' };
            const obj2 = { a: 'aa', c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expect( ['a','b','c','d'] ).to.deep.equal( Object.keys(merged) );
            expect( 'aa' ).to.equal( merged.a );
            expect( 'b' ).to.equal( merged.b );
            expect( 'c' ).to.equal( merged.c );
            expect( 'd' ).to.equal( merged.d );

        }
    )

    it(`should make a shallow copy of the sources' properties`,
        function () {
            const sentinel = {};

            const obj1 = { a:'a', b:sentinel };
            const obj2 = { c:'c', d:'d' };
            const merged = merge(obj1, obj2);

            expect( obj1.b ).equal( merged.b );
            
        }
    )

    it(`if passed a single source, it should return a shallow copy of it`,
        function () {
            const sentinel = {};
            const obj1 = { a:'a', b:sentinel };
            const merged = merge(obj1);

            expect( obj1 ).to.deep.equal( merged );
            expect(obj1.a).to.equal(merged.a);
            expect( obj1.b).to.equal(merged.b );
            
        }
    )

    it(`should only copy own properties from the sources`,
        function () {
            const proto = { a:'a'};
            const obj = Object.create(proto);
            obj.b = 'b';

            const merged = merge(obj);

            expect( 1 ).to.equal( Object.keys(merged).length );
            expect( merged.a ).to.be.undefined;
            expect( 'b' ).to.equal( merged.b );
        }
    )

    it(`should only copy enumerable properties from the sources`,
        function () {
            obj = { a:'a' };
            Object.defineProperty(obj, 'b', {value:'b', enumerable:false});
            const merged = merge(obj);

            expect( 1 ).to.equal( Object.keys(merged).length );
            expect( merged.b ).to.be.undefined;
            expect( 'a' ).to.equal( merged.a );
            
        }
    )

    it(`should return an empty object if no sources are passed`,
        function () {
            expect( merge() ).to.deep.equal({});
        }
    )

    it(`should return an empty object if null or undefined is passed`,
        function () {
            expect( merge(null) ).to.deep.equal({});
            expect( merge(undefined) ).to.deep.equal({});
        }
    )
})
