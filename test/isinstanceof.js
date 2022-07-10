const expect = require('chai').expect;
const isinstanceof = require('../src/isinstanceof');

class Foobar {}
class SubFoobar extends Foobar {}

describe(`isinstanceof()`, function() {

    it(`should be curried`, 
        function() {
            const curried = isinstanceof(Foobar);
            expect(curried).to.be.a('function');
            expect( curried(new Foobar()) ).to.be.a('boolean');
        }
    )

    it(`should throw if the class is not a function`, 
        function() {
            expect( ()=>isinstanceof({}, new Foobar()) ).to.throw();
            expect( ()=>isinstanceof(null, new Foobar()) ).to.throw();
            expect( ()=>isinstanceof('foobar', new Foobar()) ).to.throw();
            expect( ()=>isinstanceof(42, new Foobar()) ).to.throw();
        }
    )

    it(`should return true if the object is an instance of the class`, 
        function() {
            expect( isinstanceof(Foobar, new Foobar()) ).to.be.true;
            expect( isinstanceof(Array, []) ).to.be.true;
            expect( isinstanceof(Object, {}) ).to.be.true;
            expect( isinstanceof(Date, new Date()) ).to.be.true;
        }
    )

    it(`should return true if the object is an instance of a subclass of the class`, 
        function() {
            expect( isinstanceof(Foobar, new SubFoobar()) ).to.be.true;
        }
    )

    it(`should return false if the object is not an instance of the class`, 
        function() {
            expect( isinstanceof(Foobar, {}) ).to.be.false;
            expect( isinstanceof(Foobar, null) ).to.be.false;
            expect( isinstanceof(Foobar, undefined) ).to.be.false;
            expect( isinstanceof(Foobar, 42) ).to.be.false;
        }
    )

})