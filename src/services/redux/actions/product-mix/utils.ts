import { fedToSqm, fromPercentage } from "../../../../services/utils/measuring-units-converter";
import { measuringUnits } from "../../../../services/utils/measuring-unit";
import { BuildingDefinition, LandAreaDivision } from "../../states/product-mix.state";

export const getLandDivisionIndexByName = (areaDivisions: LandAreaDivision[], areaDivisionName: string) => {
    return areaDivisions.map(division => division.name).indexOf(areaDivisionName);
}

// area in the store is always in square meter
export const getLandDivisionsTotalOccupiedArea = (areaDivisions: LandAreaDivision[]): number => {
    return areaDivisions.map(division => division.area).reduce(sum, 0);
}

export const getAreaInMeterSquare = (value: number, totalArea: number, type: measuringUnits): number => {
    switch (type) {
        case measuringUnits.PER: {
            return fromPercentage(totalArea, value);
        }
        case measuringUnits.FED: {
            return fedToSqm(value);
        }
        case measuringUnits.SQM: {
            return value;
        }
        default: throw Error(`Invalid measuring unit ${type}`);
    }
}

const sum = (a: number, b: number): number => {
    return a + b;
}

export const buildingNameExists = (buildings: BuildingDefinition[], name: string) => {
    return buildings.map(building => building.name).indexOf(name) !== -1;
}
