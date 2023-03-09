const expect = require('chai').expect;
const isinstanceof = require('../src/types/isinstanceof');

class MyClass {}
class MySubClass extends MyClass {}

describe(`isinstanceof()`, function() {

    it(`should return true if the object is an instance of the class`, 
        function() {
            expect( isinstanceof(MyClass, new MyClass()) ).to.be.true;
            expect( isinstanceof(Array, []) ).to.be.true;
            expect( isinstanceof(Object, {}) ).to.be.true;
            expect( isinstanceof(Date, new Date()) ).to.be.true;
        }
    )

    it(`should return true if the object is an instance of a subclass of the class`, 
        function() {
            expect( isinstanceof(MyClass, new MySubClass()) ).to.be.true;
        }
    )

    it(`should return false if the object is not an instance of the class`, 
        function() {
            expect( isinstanceof(MyClass, {}) ).to.be.false;
            expect( isinstanceof(MyClass, null) ).to.be.false;
            expect( isinstanceof(MyClass, undefined) ).to.be.false;
            expect( isinstanceof(MyClass, 42) ).to.be.false;
        }
    )

    it(`should throw if the class is not a function`, 
        function() {
            expect( () => isinstanceof(42, {}) ).to.throw();
            expect( () => isinstanceof(null, null) ).to.throw();
            expect( () => isinstanceof(undefined, undefined) ).to.throw();
            expect( () => isinstanceof('foobar', 42) ).to.throw();
            expect( () => isinstanceof({}, 42) ).to.throw();
            expect( () => isinstanceof(42n, 42) ).to.throw();
            expect( () => isinstanceof(true, 42) ).to.throw();
            expect( () => isinstanceof() ).to.throw();
        }
    )
})