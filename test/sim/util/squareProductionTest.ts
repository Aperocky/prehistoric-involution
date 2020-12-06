import { SquareProduction } from '../../../src/sim/util/squareProduction';
import { Square } from '../../../src/map/square';
import { testfuncs as terrain } from '../../../src/map/generateTerrain';
import { GRASS_SQUARE } from '../../map/squareTest';
import { JACK_SPARROW, WILL_TURNER } from '../people/personTest';
import { expect } from 'chai';


describe('squareProduction', () => {
    it('test squareProduction', () => {
        let sqp = new SquareProduction(GRASS_SQUARE);
        sqp.addRegistryItem(JACK_SPARROW);
        expect(sqp.getStrength("HUNT")).to.equal(1);
        sqp.addRegistryItem(WILL_TURNER);
        expect(sqp.getStrength("HUNT")).to.equal(2);
        sqp.calculateProduce();
        expect(sqp.productionRegistry["HUNT"]).to.equal(8);
        expect(sqp.distributeRegistry[JACK_SPARROW.id]).to.equal(4);
        expect(sqp.distributeRegistry[WILL_TURNER.id]).to.equal(4);
        sqp.reset();
        expect(sqp.distributeRegistry).to.be.empty;
    });
});
