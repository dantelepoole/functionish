const zipwith = require('../zipwith');
const expect = require('chai').expect;
const isiterable = require('../isiterable');

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

describe.only('zipwith()', function() {

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

    it('should return an iterable that produces the result of passing the next items from both list arguments to func', 
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

    describe('the iterable returned by zipwith()', function() {

        it('should throw if the func argument is not a function', 
            function() {

                let iterator = zipwith({}, onetwothree, abc)[Symbol.iterator]();
                expect( ()=>iterator.next() ).to.throw();

                iterator = zipwith(concat, onetwothree, abc)[Symbol.iterator]();
                expect( ()=>iterator.next() ).to.not.throw();
            }
        )

        it('should throw if either list argument is not iterable', 
            function() {

                expect( ()=>zipwith(concat, {}, abc)[Symbol.iterator]() ).to.throw();
                expect( ()=>zipwith(concat, abc, {})[Symbol.iterator]() ).to.throw();
                expect( ()=>zipwith(concat, onetwothreeobject, abcobject)[Symbol.iterator]() ).to.not.throw();
            }
        )
        
        it('should iterate over the number of items in the "shortest" argument', 
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