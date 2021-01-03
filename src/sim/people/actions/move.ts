import { Household } from '../household';
import { Location, randomWalk, oceanCrossing } from '../../util/location';
import { ResourceType } from '../properties/resourceTypes';
import { Square } from '../../../map/square';
import { SAIL_CHANCE } from '../../../constant/simConstants';


export default function move(household: Household, terrain: Square[][]): void {
    // If hungry in current location, move.
    let foodSecurity = household.percentSatisfied[ResourceType.Food];
    let distance = 0;
    if (Math.random() > foodSecurity + 0.1) {
        if (sail(household, terrain)) {
            return;
        }
        distance = household.dependents.length ? 1 : 5;
        distance += Math.floor(Math.random() * 3);
    } else if (household.isSingle) {
        if (household.adults[0].work.work == "HUNT") {
            // Hunter spread
            distance = Math.floor(Math.random() * 5) + 5;
        } else if (household.adults[0].work.work == "FARM") {
            // Farm spread
            distance = 1;
        }
    }
    if (distance) {
        household.location = randomWalk(household.location, terrain, distance);
        household.stay = 0;
    } else {
        household.stay++;
    }
}


function sail(household: Household, terrain: Square[][]): boolean {
    let loc = household.location;
    let square = terrain[loc.y][loc.x];
    if (square.isCoast && Math.random() < SAIL_CHANCE) {
        household.location = oceanCrossing(loc, terrain, 20, 5);
        return true;
    }
    return false;
}
