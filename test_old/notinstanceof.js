const expect = require('chai').expect;
const notinstanceof = require('../notinstanceof');

class Foobar {}
class SubFoobar extends Foobar {}

describe(`notinstanceof()`, function() {

    it(`should be curried`, 
        function() {
            const curried = notinstanceof(Foobar);
            expect(curried).to.be.a('function');
            expect( curried(new Foobar()) ).to.be.a('boolean');
        }
    )

    it(`should throw if the class is not a function`, 
        function() {
            expect( ()=>notinstanceof({}, new Foobar()) ).to.throw();
            expect( ()=>notinstanceof(null, new Foobar()) ).to.throw();
            expect( ()=>notinstanceof('foobar', new Foobar()) ).to.throw();
            expect( ()=>notinstanceof(42, new Foobar()) ).to.throw();
        }
    )

    it(`should return false if the object is an instance of the class`, 
        function() {
            expect( notinstanceof(Foobar, new Foobar()) ).to.be.false;
            expect( notinstanceof(Array, []) ).to.be.false;
            expect( notinstanceof(Object, {}) ).to.be.false;
            expect( notinstanceof(Date, new Date()) ).to.be.false;
        }
    )

    it(`should return false if the object is an instance of a subclass of the class`, 
        function() {
            expect( notinstanceof(Foobar, new SubFoobar()) ).to.be.false;
        }
    )

    it(`should return true if the object is not an instance of the class`, 
        function() {
            expect( notinstanceof(Foobar, {}) ).to.be.true;
            expect( notinstanceof(Foobar, null) ).to.be.true;
            expect( notinstanceof(Foobar, undefined) ).to.be.true;
            expect( notinstanceof(Foobar, 42) ).to.be.true;
        }
    )
})