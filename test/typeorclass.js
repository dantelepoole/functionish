const expect = require('chai').expect;
const typeorclass = require('../typeorclass');

class Foobar {}
class SubFoobar extends Foobar {}

class TaggedClass {
    get [Symbol.toStringTag]() { return 'ClassTag'}
}

describe(`typeorclass()`, function() {

    it(`should return a primitive type's type`,
        function() {
            expect( typeorclass('foobar') ).to.equal('string');
            expect( typeorclass() ).to.equal('undefined');
            expect( typeorclass(undefined) ).to.equal('undefined');
            expect( typeorclass(1) ).to.equal('number');
            expect( typeorclass(NaN) ).to.equal('number');
            expect( typeorclass(1n) ).to.equal('bigint');
            expect( typeorclass(true) ).to.equal('boolean');
            expect( typeorclass(Symbol()) ).to.equal('symbol');
        }
    )

    it(`should return 'null' if the value is null`,
        function() {
            expect( typeorclass(null) ).to.equal('null');
        }
    )

    it(`should return 'Object' (capitalized) if the value is a generic object`,
        function() {
            expect( typeorclass({}) ).to.equal('Object');
        }
    )

    it(`should return the value's tag if it is an instance of a class with a Symbol.toStringTag getter`,
        function() {
            expect( typeorclass(new TaggedClass()) ).to.equal('ClassTag');
        }
    )

    it(`should return the name of the value's constructor function if it is object`,
        function() {
            expect( typeorclass(new Foobar()) ).to.equal('Foobar');
            expect( typeorclass(new SubFoobar()) ).to.equal('SubFoobar');
        }
    )
});