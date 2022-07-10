const expect = require('chai').expect;
const isdeepequal = require('../src/isdeepequal');

const sentinel = { name:'Foobar', age:42 }
const clone = { age:42, name:'Foobar' }


describe(`isdeepequal()`, function() {

    beforeEach(
        function() {
        }
    )

    it(`should be curried`,
        function () {

            const curried = isdeepequal(sentinel);
            expect(curried).to.be.a('function');
            
            expect( curried(clone) ).not.to.be.a('function');
            expect( curried(clone) ).to.be.true;
        }
    )

    it(`should return true of the arguments are deep equal`,
        function () {
            expect( isdeepequal(sentinel,clone) ).to.be.true;
            expect( isdeepequal(sentinel,sentinel) ).to.be.true;
        }
    )

    it(`should return false of the arguments are not deep equal`,
        function () {
            expect( isdeepequal(sentinel,{}) ).to.be.false;
            expect( isdeepequal(sentinel,null) ).to.be.false;
            expect( isdeepequal(sentinel,42) ).to.be.false;
            expect( isdeepequal(sentinel,false) ).to.be.false;
            expect( isdeepequal(sentinel,[]) ).to.be.false;
        }
    )

})
