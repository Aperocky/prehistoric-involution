import * as mapConstants from '../constant/mapConstants';

export enum Terrain {
    Water = 1,
    Grass = 2,
    Forest = 3,
    MountainRock = 4,
    Desert = 5,
    MountainGrass = 6
}

// Square represent each locations.
export class Square {

    altitude: number;
    precip: number;
    terrain: Terrain;
    riverDirection: number;
    // Good for a square to know its current location.
    x: number;
    y: number;

    constructor(height: number, precip: number, riverDirection: number, x: number, y: number) {
        this.x = x;
        this.y = y;
        this.altitude = this.getRealHeight(height);
        this.precip = this.getRealPrecip(precip);
        this.riverDirection = riverDirection;
        this.terrain = this.getTerrain();
    }

    isRiver(): boolean {
        return !(this.riverDirection == 4 || this.riverDirection == 9);
    }

    isWater(): boolean {
        return this.riverDirection == 4 || this.altitude < 0;
    }

    private getRealHeight(rawHeight: number): number {
        return (rawHeight - mapConstants.ALTITUDE_ADJUST) * mapConstants.ALTITUDE_SCALAR;
    }

    private getRealPrecip(rawPrecip: number): number {
        return rawPrecip * mapConstants.PRECIPITATION_SCALAR;
    }

    private getTerrain(): Terrain {
        if (this.isWater()) {
            return Terrain.Water;
        }
        let effectivePrecip = this.precip + (this.isRiver() ? 300 : 0);
        if (this.altitude < mapConstants.MOUNTAIN_ALTITUDE) {
            return effectivePrecip < mapConstants.DESERT_BIOME_PRECIP_CUTOFF
                    ? Terrain.Desert
                    : effectivePrecip < mapConstants.GRASS_BIOME_PRECIP_CUTOFF
                    ? Terrain.Grass : Terrain.Forest;
        }
        return effectivePrecip > mapConstants.MOUNTAIN_BIOME_PRECIP_CUTOFF
                ? Terrain.MountainGrass : Terrain.MountainRock;
    }
}
