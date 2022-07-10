const expect = require('chai').expect;
const notdeepequal = require('../src/notdeepequal');

const sentinel = { name:'Foobar', age:42 }
const clone = { age:42, name:'Foobar' }
const notclone = { age:43, name:'Foobar' }


describe(`notdeepequal()`, function() {

    beforeEach(
        function() {
        }
    )

    it(`should be curried`,
        function () {

            const curried = notdeepequal(sentinel);
            expect(curried).to.be.a('function');
            
            expect( curried(clone) ).not.to.be.a('function');
            expect( curried(notclone) ).to.be.true;
        }
    )

    it(`should return false if the arguments are deep equal`,
        function () {
            expect( notdeepequal(sentinel,clone) ).to.be.false;
            expect( notdeepequal(sentinel,sentinel) ).to.be.false;
        }
    )

    it(`should return true of the arguments are not deep equal`,
        function () {
            expect( notdeepequal(sentinel, notclone) ).to.be.true;
            expect( notdeepequal(sentinel,{}) ).to.be.true;
            expect( notdeepequal(sentinel,null) ).to.be.true;
            expect( notdeepequal(sentinel,42) ).to.be.true;
            expect( notdeepequal(sentinel,false) ).to.be.true;
            expect( notdeepequal(sentinel,[]) ).to.be.true;
        }
    )

})
