const zip = require('../zip');
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

describe('zip()', function() {

    beforeEach(
        function() {
        }
    )

    it('should be curried with binary arity', 
        function() {

            const curried = zip(abc);
            expect(curried).to.be.a('function');
            const result = curried(onetwothree);
            expect( isiterable(result) ).to.be.true;
        }
    )

    it('should return an iterable that pairs the next items from both arguments on each iteration', 
        function() {

            const result = zip(abc,onetwothree);
            let index = 0;

            for( const item of result ) {
                expect(item).to.be.an('array').with.length(2);
                expect(item[0]).to.be.equal(abc[index]);
                expect(item[1]).to.be.equal(onetwothree[index]);
                index++;
            }
        }
    )

    describe('the returned iterable()', function() {
        
        it('should throw if either argument is not iterable', 
            function() {

                expect( ()=>zip({}, abc)[Symbol.iterator]() ).to.throw();
                expect( ()=>zip(abc, {})[Symbol.iterator]() ).to.throw();
                expect( ()=>zip(onetwothreeobject, abcobject)[Symbol.iterator]() ).to.not.throw();
            }
        )
        
        it('should iterate over the number of items in the "shortest" argument', 
            function() {
                const result = zip(onetwothree, onetwothreefourfive);
                let index = 0;

                for( const item of result ) {
                    expect(item).to.be.an('array').with.length(2);
                    expect(item[0]).to.be.equal(onetwothree[index]);
                    expect(item[1]).to.be.equal(onetwothreefourfive[index]);
                    index++;
                }

                expect(index).to.be.equal(onetwothree.length);
            }
        )
    })
})