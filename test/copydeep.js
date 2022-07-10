const deepclone = require('../src/copydeep');
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

    it('should return a deep clone of an array argument',
        function () {

            const family = [mother, father, son, daughter];
            const eviltwins = deepclone(family);

            expect(eviltwins).to.be.an('array').with.length(family.length);
            expect(eviltwins).not.to.be.equal(family);
            expect(eviltwins).to.be.deep.equal(family);

            expect(family[0]).not.to.be.equal(eviltwins[0]);
            expect(family[0]).to.be.deep.equal(eviltwins[0]);
            expect(family[1]).not.to.be.equal(eviltwins[1]);
            expect(family[1]).to.be.deep.equal(eviltwins[1]);
            expect(family[2]).not.to.be.equal(eviltwins[2]);
            expect(family[2]).to.be.deep.equal(eviltwins[2]);
            expect(family[3]).not.to.be.equal(eviltwins[3]);
            expect(family[3]).to.be.deep.equal(eviltwins[3]);
        }
    )

})