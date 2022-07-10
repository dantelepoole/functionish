const zipwith = require('../src/zipwith');
const expect = require('chai').expect;
const isiterable = require('../src/isiterable');

const abc = ['a','b','c'];
const onetwothree = [1,2,3];
const onetwothreefourfive = [1,2,3,4,5];
const abcobject = {
    [Symbol.iterator]() {
        return function* () {
            yield 'a';
            yield 'b';
            yield 'c';
        }
    }
}
const onetwothreeobject = {
    [Symbol.iterator]() {
        return function* () {
            yield 1;
            yield 2;
            yield 3;
        }
    }

}

function concat(a,b) {
    return `${a}${b}`;
}

describe('zipwith()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with ternary arity', 
        function() {

            const curried = zipwith(concat);
            expect(curried).to.be.a('function');
            const curried2 = curried(abc);
            expect(curried2).to.be.a('function');
            const result = curried2(onetwothree);
            expect( isiterable(result) ).to.be.true;
        }
    )

    it('should throw if the function is not a function', 
        function() {
            expect( ()=>zipwith({}, onetwothree, abc) ).to.throw();
        }
    )

    it('should throw if either list argument is not iterable', 
        function() {

            expect( ()=>zipwith(concat, {}, abc) ).to.throw();
            expect( ()=>zipwith(concat, abc, {}) ).to.throw();
        }
    )

    describe('the iterable returned by zipwith()', function() {

        it('should return an iterable that produces the result of passing the next items from both lists to the function', 
            function() {

                const result = zipwith(concat, abc,onetwothree);
                let index = 0;

                for( const item of result ) {
                    expect(item).to.be.a('string').with.length(2);
                    expect(item).to.be.equal(`${abc[index]}${onetwothree[index]}`);
                    index++;
                }
            }
        )
        
        it('should iterate over the number of items in the list that produces the smallest number of items', 
            function() {
                const result = zipwith(concat, onetwothree, onetwothreefourfive);
                let index = 0;

                for( const item of result ) {
                    expect(item).to.be.a('string').with.length(2);
                    expect(item).to.be.equal(`${onetwothree[index]}${onetwothreefourfive[index]}`);
                    index++;
                }

                expect(index).to.be.equal(onetwothree.length);
            }
        )
    })
})