const deepclone = require('../deepclone');
const expect = require('chai').expect;

const mother = { name : 'Ann', age  : 42, children : [] }
const father = { name : 'Bob', age  : 43, children : [] }
const son = { name : 'Charles', age : 10, mother, father }
const daughter = { name : 'Desiree', age : 11, mother, father, sibling:son }

mother.children.push(son, daughter);
father.children.push(son, daughter);
son.sibling = daughter;


describe('deepclone()', function() {

    beforeEach(
        function() {
        }
    )

    it('should simply return a non-object argument',
        function () {
            const nonobjects = [42,true,null,undefined,x=>x,42n];
            for( const item of nonobjects) expect( deepclone(item) ).to.be.equal(item);

            expect( deepclone(NaN) ).to.be.NaN;
        }
    )

    it('should return a deep clone of an object argument',
        function () {

            const twinson = deepclone(son);

            expect(twinson).not.to.be.equal(son);
            expect(twinson).to.be.deep.equal(son);
            expect(twinson.father).not.to.be.equal(father);
            expect(twinson.father).to.be.deep.equal(father);
            expect(twinson.mother).not.to.be.equal(mother);
            expect(twinson.mother).to.be.deep.equal(mother);
            expect(twinson.sibling).not.to.be.equal(daughter);
            expect(twinson.sibling).to.be.deep.equal(daughter);
        }
    )

    it('should be further tested')
})